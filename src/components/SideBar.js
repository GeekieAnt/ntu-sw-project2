import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import api from "../Services/api";

//today
let today = new Date().toISOString().slice(0, 10);
console.log("today =>", today);

// 30 days
const day30 = new Date();
day30.setDate(day30.getDate() - 30);
let startDate30D = day30.toISOString().slice(0, 10);
console.log("startDate30D =>", startDate30D);

// 7 days
const day7 = new Date();
day7.setDate(day7.getDate() - 7);
let startDate7D = day7.toISOString().slice(0, 10);

// next 7 days
const dayNext7 = new Date();
dayNext7.setDate(dayNext7.getDate() + 7);
let startDateNext7D = dayNext7.toISOString().slice(0, 10);
console.log("startDateNext7D =>", startDateNext7D);

const SideBar = ({ setGames, setNext, genres }) => {
  const [genre, setGenre] = useState("");

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const handleGetGames30D = () => {
    api
      .get("/games", {
        params: {
          dates: `${startDate30D},${today}`,
        },
      })
      .then(({ data }) => {
        setGames(data.results);
        setNext(data.next);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleGetGames7D = () => {
    api
      .get("/games", {
        params: {
          dates: `${startDate7D},${today}`,
        },
      })
      .then(({ data }) => {
        setGames(data.results);
        setNext(data.next);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleGetGamesNext7D = () => {
    api
      .get("/games", {
        params: {
          dates: `${today},${startDateNext7D}`,
        },
      })
      .then(({ data }) => {
        setGames(data.results);
        setNext(data.next);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleSelectGenre = () => {
    console.log("genre =>", genre);
    api
      .get(`/games?genres=${genre.toLowerCase()}`)
      .then(({ data }) => {
        setGames(data.results);
        setNext(data.next);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleSelectGenre();
  }, []);

  return (
    <Box alignContent={"flex-start"}>
      <Typography variant="h6">New Releases</Typography>
      <Button onClick={handleGetGames30D}>
        <Typography color={"white"}>Last 30 Days</Typography>
      </Button>
      <Button onClick={handleGetGames7D}>
        <Typography color={"white"}>This Week</Typography>
      </Button>
      <Button onClick={handleGetGamesNext7D}>
        <Typography color={"white"}>Next Week</Typography>
      </Button>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Genre</InputLabel>
        <Select value={genre} label="Genre" onChange={handleChange}>
          {genres.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SideBar;
