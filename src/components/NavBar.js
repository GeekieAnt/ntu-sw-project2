import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import InputAdornment from "@mui/material/InputAdornment";
import { VideogameAssetOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { clear } from "@testing-library/user-event/dist/clear";

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
};

const NavBar = ({ handleSearch, handlerGetGames }) => {
  const [input, setInput] = useState("");

  const submitSearch = () => {
    handleSearch(input);
  };

  const clearSearch = () => {
    setInput("");
  };

  const home = () => {
    handlerGetGames();
    setInput("");
  };

  return (
    <AppBar>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Box flexGrow={1}>
          <IconButton
            component={NavLink}
            to="/"
            sx={navStyles}
            onClick={handlerGetGames}
          >
            <VideogameAssetOutlined sx={{ color: "white" }} />
          </IconButton>
          <Typography component={NavLink} to="/" sx={navStyles} onClick={home}>
            GAME STORE
          </Typography>
        </Box>

        <Box flexGrow={3}>
          <TextField
            placeholder="Search for games"
            fullWidth
            size="small"
            variant="outlined"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitSearch();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {input && (
                    <IconButton edge="end">
                      <CancelIcon onClick={clearSearch} />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <SearchIcon onClick={submitSearch} sx={{ ml: 1 }} />
        <Box flexGrow={1} sx={{ ml: 10 }}>
          <Typography component={NavLink} to="/" sx={navStyles}></Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
