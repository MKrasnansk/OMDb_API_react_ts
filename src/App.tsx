import React from "react";
import { Box, ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { NavComponent } from "./components/NavComponent";
import { theme } from "./theme";
import { FavoriteFilms } from "./views/FavoriteFilms";
import { FindMovies } from "./views/FindMovies";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="text.disabled" textAlign="center">
        <header>
          <NavComponent />
        </header>
        <main>
          <Switch>
            <Route path="/" component={FindMovies} exact></Route>
            <Route path="/favorite" component={FavoriteFilms}></Route>
          </Switch>
        </main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
