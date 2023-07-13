import React from "react";
import { Button, Typography, CardMedia, Grid } from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';
import { useState, useEffect} from "react";
import api from "../Services/api";


const GameDetailPage = ({darkTheme}) => {
  const navigate = useNavigate();

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

  console.log(game);

  
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
        spacing={1} 
        columns={{xs: 7, lg: 12}}
        justifyContent="center"
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
      <Grid container
        justifyContent="center"
        xs={7} lg={5}>
          <CardMedia
            component="img"
            image={background_image} 
            sx={{ 
              height: 300, 
              width: 450,
              margin:4,
              // mx: 3,
              
            }}
          />
      </Grid>
    </Grid>
    </>
  )
};

export default GameDetailPage;
