import React from "react";
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
import { REUSABLE, STATUS_MESSAGE } from "../constants";

const ModalComponent = ({
  open,
  handleClose,
  contents,
  usage,
  approveRequest,
  removeFriend,
}) => {
  const style = {
    zIndex: 2,
    position: "absolute",
    top: "70px",
    padding: 10,
    right: usage === REUSABLE.NOTIFICATION ? "70px" : "110px",
    width: 300,
    borderRadius: 1,
    bgcolor: "background.paper",
    boxShadow: 10,
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
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {contents.length === 0 ? (
              <div className="message-center">
                {usage === REUSABLE.NOTIFICATION
                  ? STATUS_MESSAGE.EMPTY_NOTIFICATIONS
                  : STATUS_MESSAGE.EMPTY_FRIENDS}
              </div>
            ) : (
              <List>
                {contents.map((content) => (
                  <div>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>H</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={content.name}
                        secondary={content.username}
                        primaryTypographyProps={{ sx: { fontSize: 13 } }}
                        secondaryTypographyProps={{ sx: { fontSize: 13 } }}
                      />
                      <div id={"fgfh"}>
                        {usage === REUSABLE.NOTIFICATION ? (
                          <Button
                            className="accept-button"
                            variant="contained"
                            onClick={(e) => approveRequest(e, content)}
                          >
                            Accept
                          </Button>
                        ) : (
                          <></>
                        )}
                        <Button
                          className="not-button"
                          variant="outlined"
                          onClick={(e) => removeFriend(e, content)}
                        >
                          {usage === REUSABLE.NOTIFICATION
                            ? "Reject"
                            : "Remove"}
                        </Button>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
              </List>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComponent;
