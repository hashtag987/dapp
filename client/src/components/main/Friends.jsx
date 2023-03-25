import React,{useState} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Friends=()=> {
  const [requested, setrequested] = useState({})
  const handleClick = (event) => {
    setrequested({ [event.currentTarget.id]: requested });
    console.log(requested)
  };
  return (
    <div className="cards">
      <List
        sx={{
          marginTop: 7,
          marginLeft: 10,
          height: 300,
          width: 280,
          bgcolor: "background.paper",
          padding: "10px",
          overflow: "auto",
        }}
      >
        {[...new Array(12)].map((index) => (
          <div>
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>H</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Arun" secondary="@arun123" />
              <div id={index} onClick={handleClick}>
                <PersonAddAlt1Icon                
                  style={{
                    cursor:"pointer",
                    float: "right",
                    marginBottom: "8px",
                    fontSize: "20px",
                  }}
                />
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
}
export default Friends;