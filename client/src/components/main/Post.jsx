import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import test from "../../assets/images/paella.jpg";
import { Button } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        marginTop: 9,
        marginleft: 100,
        position: "absolute",
        top: 110,
        left: 400,
      }}
    >
      <Card sx={{ maxWidth: 600, marginBottom: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              A
            </Avatar>
          }
          title="You"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              placeholder="What's on your mind"
              style={{ width: 550, fontFamily:"sans-serif !important" }}
            />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            size="medium"
            style={{
              marginTop: "-10px",
              marginLeft:"8px",
              textTransform: "none",
              width: 130,
              backgroundColor: "",
            }}
          >
            Post
          </Button>
        </CardActions>
      </Card>
      {[...new Array(12)].map((index) => (
        <Card sx={{ maxWidth: 600, marginBottom: 2 }} key={index}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          {index%2!==0?<CardMedia
            component="img"
            height="394"
            image={test}
            alt="Paella dish"
          />:<p/>}
          
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton aria-label="share" sx={{ fontSize: 15 }}>
              2
            </IconButton> */}
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
