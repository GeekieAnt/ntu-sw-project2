import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

darkTheme.typography.h1 = {
  fontSize: "4rem",
  "@media (min-width:600px)": {
    fontSize: "4rem",
  },
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "2.4rem",
  },
};

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/id/:gameId" element={<GameDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
