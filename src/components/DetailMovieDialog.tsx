import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Slide,
  SlideProps,
  Theme,
  Typography
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import CancelIcon from "@material-ui/icons/Cancel";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useEffect, useState } from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "none",
      fontSize: "13px",
      padding: "10px",
    },
    media: {
      paddingTop: "56.25%", // 16:9
    },
  })
);
interface State {
  id: string;
  isOpen: boolean;
  onNo: any;
  data: any;
  poster: string;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<SlideProps> },
  ref: React.Ref<State>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const DetailMovieDialog: React.FC<State> = (props) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const { isOpen, onNo, data, poster, id } = props;
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.hasOwnProperty(id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favorite, id]);

  const handleFavorites = () => {
    let items = [];
    if (favorite === false) {
      setFavorite(true);
      localStorage.setItem(data.imdbID, JSON.stringify(data));
      const keys = Object.keys(localStorage);
      let key;
      for (let i = 0; (key = keys[i]); i++) {
        items.push(key + "=" + localStorage.getItem(key));
        // eslint-disable-next-line
        let objData = localStorage.getItem(key);
      }
    } else {
      setFavorite(false);
      localStorage.removeItem(data.imdbID);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onNo} TransitionComponent={Transition}>
      <Card className={classes.root}>
        <Grid container direction="row" justifyContent="space-between">
          <CardHeader
            titleTypographyProps={{ variant: "caption" }}
            title={
              data.Title +
              " |  runtime: " +
              data.Runtime +
              " | r.: " +
              data.Year
            }
          />
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={handleFavorites}>
              <FavoriteIcon
                style={favorite ? { fill: "red" } : { fill: "#333" }}
              />
            </IconButton>
            <IconButton onClick={onNo} aria-label="add to favorites">
              <CancelIcon />
            </IconButton>
          </CardActions>
        </Grid>
        <CardMedia
          className={classes.media}
          image={poster}
          title={data.Title}
        />
        <CardContent style={{ marginBottom: "50px" }}>
          <Typography gutterBottom variant="caption" component="div">
            <strong>Director:</strong> {data.Director}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            <strong>Awards:</strong> {data.Awards}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            <strong>Actors:</strong> {data.Actors}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            <strong>Production:</strong> {data.Production}
          </Typography>
          <hr />
          <Typography gutterBottom variant="caption" component="div">
            {data.Plot}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
};
