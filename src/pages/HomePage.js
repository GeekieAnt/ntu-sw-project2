import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import SideBar from "../components/SideBar";
import { Container, Button } from "@mui/material";
import api from "../Services/api";
import GameList from "../components/GameList";
import axios from "axios";
import NavBar from "../components/NavBar";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [next, setNext] = useState("");
  const [results, setResults] = useState(null);
  const [genres, setGenres] = useState([]);

  const handleGetGames = () => {
    api
      .get("/games")
      .then(({ data }) => {
        console.log(data);
        setGames(data.results);
        setNext(data.next);
        setResults(null);
      })
      .catch((error) => console.log(error));
  };

  const handleLoadMore = () => {
    axios
      .get(next)
      .then(({ data }) => {
        console.log(data);
        setGames((prevGames) => [...prevGames, ...data.results]);
        setNext(data.next);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = async (search) => {
    try {
      const response = await api(`/games?search=${search}`);
      console.log(response.data);
      setGames(response.data.results);
      setNext(response.data.next);
      setResults(response.data.count);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGetGenres = () => {
    api
      .get("/genres")
      .then(({ data }) => {
        console.log("genres =>", data);
        setGenres(data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetGames();
    handleGetGenres();
  }, []);

  return (
    <>
      <NavBar handleSearch={handleSearch} handlerGetGames={handleGetGames} />
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          <Grid xs={2}>
            <SideBar setGames={setGames} setNext={setNext} genres={genres} />
          </Grid>
          <Grid xs={10}>
            {results > 1 && <p>About {results} results found</p>}
            <GameList games={games} />
            {results === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: "50px",
                }}
              >
                <ErrorOutlineIcon />
                <p>Nothing found</p>
              </div>
            )}
          </Grid>
        </Grid>
        {next && (
          <Button
            onClick={handleLoadMore}
            sx={{ float: "right", margin: 5, color: "white" }}
          >
            LOAD MORE
          </Button>
        )}
      </Container>
    </>
  );
};

export default HomePage;
