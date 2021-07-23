import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { FavoriteCard } from "../components/FavoriteCard";

export const FavoriteFilms: React.FC = () => {
  const [keys, setKeys] = useState(Object.keys(localStorage));

  const handleRemove = (key: string) => {
    localStorage.removeItem(key);
    setKeys(Object.keys(localStorage));
  };

  return (
    <Grid container direction="row" justifyContent="center">
      {keys.map((key) => (
        <FavoriteCard key={key} data={key} fnRemover={handleRemove} />
      ))}
    </Grid>
  );
};
