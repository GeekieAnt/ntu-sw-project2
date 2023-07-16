import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Rating,
  Stack,
} from "@mui/material";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const GameList = ({ games }) => {
  return (
    <Grid container space={4}>
      {games.map((item) => (
        <Grid xs={4} md={3} key={item.id}>
          <Card sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              image={item.background_image}
              sx={{ height: 200, margin: 1 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                <NavLink 
                  to={`/id/${item.id}`} 
                  state={{stateParam: games}}
                  style={linkStyle}
                  
                  key={item.id}>
                  {item.name}
                </NavLink>
              </Typography>
              <Stack>
                <Rating defaultValue={item.rating} precision={0.1} readOnly />
              </Stack>
              {item.parent_platforms.map((platform) => (
                <Chip
                  sx={{ m: 0.1 }}
                  key={platform.platform.id}
                  label={platform.platform.slug}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GameList;
