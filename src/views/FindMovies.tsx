import { Container } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { ListAllSearch } from "../components/ListAllSearch";
import { SearchComponent } from "../components/SearchComponent";

interface Movies {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
}
export const FindMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movies[]>([]);

  const handleSubmit = async (query: string, page: number) => {
    await axios
      .get(
        `http://omdbapi.com/?apikey=${
          process.env.REACT_APP_API_KEY
        }&s=${encodeURI(query)}&page=${page}`
      )
      .then((response) => {
        let moviesObj = response.data.Search.filter(
          (movie: Movies) => movie.Type === "movie"
        ).map((movie: Movies) => movie);
        setMovies(moviesObj);
      });
    return await movies;
  };
  return (
    <Container>
      <p>Vyhladavanie filmov</p>
      <SearchComponent onSearchSubmit={handleSubmit} />
      {movies.map((movie) => (
        <ListAllSearch
          key={movie.imdbID}
          id={movie.imdbID}
          title={movie.Title}
          poster={movie.Poster}
          year={movie.Year}
        />
      ))}
    </Container>
  );
};
