import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { DetailMovieDialog } from "./DetailMovieDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "10px",
      width: 200,
      background: "#333131",
      fontSize: "13px",
    },
    media: {
      paddingTop: "56.25%", // 16:9
    },
  })
);
interface Props {
  id: string;
  title: string;
  poster: string;
  year: string;
  data?: any;
}
export interface Detail {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export const ListAllSearch: React.FC<Props> = (props) => {
  const [details, setDetails] = useState<Detail[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { title, poster, id } = props;
  const classes = useStyles();

  const closeDialog = () => setIsOpen(false);
  const handleDetail = async () => {
    setIsOpen(true);
    await axios
      .get(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}&plot=full`
      )
      .then((response) => {
        setDetails(response.data);
      });
    return await details;
  };

  return (
    <Grid container direction="row" justifyContent="center">
      <div>
          <DetailMovieDialog
            key={id}
            id={id}
            data={details}
            isOpen={isOpen}
            onNo={closeDialog}
            poster={poster}
          />
      </div>
      <Card className={classes.root}>
        <CardHeader titleTypographyProps={{ variant: "h6" }} title={title} />
        <CardMedia className={classes.media} image={poster} title={title} />
        <CardActions>
          <Button size="small" color="primary" onClick={handleDetail}>
            More details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
