import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Button } from "@mui/material";
import { REUSABLE } from "../constants";

const ModalComponent = ({ open, handleClose, contents, usage }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 300,
    maxHeight: 800,
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <List>
              {contents.length>0 && contents.map((content) => (
                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>H</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={content.name} secondary={content.username} />
                    <div id={"fgfh"}>
                      <Button className="not-button" variant="contained">
                        {(usage==REUSABLE.NOTIFICATION)? "Accept":"Remove"}
                      </Button>
                      {(usage==REUSABLE.NOTIFICATION)? <Button className="not-button" variant="contained">
                        Reject
                      </Button>:<></>}
                    </div>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              ))}
            </List>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComponent;
