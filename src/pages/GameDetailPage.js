import React from "react";
import { Button, Typography, CardMedia, Grid, useTheme } from "@mui/material";
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import { useState, useEffect} from "react";
import api from "../Services/api";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GameDetailPage = ( ) => {
  const navigate = useNavigate();
  const theme = useTheme();


  // get game state
  const [game, setGame] = useState([]);
  const params = useParams(); 

  const getGame = async (gameID) => {
    try {
      const response = await api(`/games/${gameID}`);
      console.log(response.data);

      setGame(response.data); 
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getGame(params.gameId);
  }, [params.gameId]);

  
  const{
    name,
    description_raw,
    background_image
  } = game 

  //to get obj with screenshots
  const stateParamVal = useLocation().state.stateParam;
  const gameItem = stateParamVal.find(item => item.id === Number(params.gameId));

  const screenshotArr = gameItem.short_screenshots.slice(1);

  //settings for carousel
    var settings = {
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      dotsClass: 'slick-dots',
      autoplay: true,
      centerMode: true,
      arrows: false,
    };
  return (
    <>
      <Button sx={{ 
        mt: 5,
        ml: 8 
      }} 
        variant="outlined"
        onClick={() => {;
        navigate('/');
      }}>
        Back
      </Button>
      <Grid container 
        justifyContent="center" 
        maxWidth={1}
        spacing={1} 
        columns={{xs: 7, lg: 12}}
        sx={{ 
          mx:1
        }}>
        <Grid item xs={7} lg={7}>
          <Typography variant="h1" sx={{ 
            mt: 5,
            mx: 10,
            textAlign: "center",
            minWidth: '250px'
            }} >
            {name} 
          </Typography>
          
          <Typography sx={{ 
            mx: 10,
            mt: 2,
            fontFamily: 'Roboto',
            fontSize: '1.2rem' }}>
            {description_raw}
          </Typography>          
        </Grid>
          <Grid item xs={7} lg={5} >
            <CardMedia item
              component="img"
              image={background_image} 
              sx={{ 
                height: 300, 
                width: 450,
                margin:4,
              }}
            />
            <Slider {...settings}>
              {screenshotArr.map((item, index) => (
                <CardMedia 
                key={index}
                component="img"
                image={item.image} 
                sx={{ 
                  height: 300, 
                  width: 450,
                  margin:2,
                  padding: 2

                }}
              />
              ))}
            </Slider>
          </Grid>
        </Grid>
    </>
  )
};

export default GameDetailPage;
