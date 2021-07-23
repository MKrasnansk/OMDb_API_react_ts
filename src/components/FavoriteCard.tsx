import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { Detail } from "./ListAllSearch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "none",
      fontSize: "13px",
      marginTop: "10px",
      height: 'auto',
      width: 200,
    },
    media: {
        height:100,
      paddingTop: "56.25%", // 16:9
    },
  })
);
interface Props {
  data: any;
  fnRemover: (key: string) => void;
}
export const FavoriteCard: React.FC<Props> = (props) => {
  const { data, fnRemover } = props;
  const classes = useStyles();
  const handleToRemove = () => {
    fnRemover(data);
  };
  const card = (): any => {
    const parser: any = localStorage.getItem(data);
    const obj: Detail = JSON.parse(parser);
    console.log(obj);
    return (
      <Card className={classes.root}>
        <CardHeader style={{height: 100}}
          titleTypographyProps={{ variant: "subtitle1" }}
          title={obj.Title}
        />
        <CardMedia
          className={classes.media}
          image={obj.Poster}
          title={obj.Title}
        />
        <CardActions >
          <Button
            size="small"
            color="primary"
            onClick={handleToRemove}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    );
  };
  return <>{card()}</>;
};
