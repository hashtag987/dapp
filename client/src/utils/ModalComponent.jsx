import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { LOGO_COLOR, REUSABLE, STATUS_MESSAGE, UI } from "../constants";
import { useEffect } from "react";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginTop: 6,
  right: 30,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: 13,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const ModalComponent = ({
  open,
  handleClose,
  contents,
  usage,
  approveRequest,
  removeFriend,
  deleteAllNotifications,
  getNotifcationTimestamp,
}) => {
  const style = {
    zIndex: 2,
    position: "absolute",
    top: "70px",
    padding: 10,
    right: usage === REUSABLE.NOTIFICATION ? "70px" : "110px",
    width: 300,
    height: 400,
    maxHeight: 400,
    overflowY: "auto",
    overflowX: "hidden",
    borderRadius: 4,
    bgcolor: "background.paper",
    boxShadow: 5,
    p: 1,
  };
  const [searchcontent, setsearchcontent] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setsearchcontent(input.value);
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
            <div className="flex-header">
              <div className="box-header">
                {usage === REUSABLE.NOTIFICATION
                  ? "Notifications"
                  : usage === REUSABLE.REQUEST
                  ? "Friend Requests"
                  : "Friends"}
                <Divider
                  sx={{
                    width: 280,
                    pt: 1,
                  }}
                />
              </div>
              {usage === REUSABLE.NOTIFICATION ? (
                <DeleteIcon
                  className="modal-header-delete"
                  onClick={deleteAllNotifications}
                />
              ) : (
                <></>
              )}
            </div>
            {contents.length > 0 && usage === REUSABLE.FRIENDS ? (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon style={{ fontSize: 20, color: LOGO_COLOR }} />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={handleChange}
                  placeholder={UI.SEARCH_FRIENDS_PLACEHOLDER}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            ) : (
              <></>
            )}

            {contents.length === 0 ? (
              <div className="message-center">
                {usage === REUSABLE.NOTIFICATION
                  ? STATUS_MESSAGE.EMPTY_NOTIFICATIONS
                  : usage === REUSABLE.REQUEST
                  ? STATUS_MESSAGE.EMPTY_REQUESTS
                  : STATUS_MESSAGE.EMPTY_FRIENDS}
              </div>
            ) : (
              <List>
                {contents
                  .filter((content) => {
                    return content.username.includes(searchcontent);
                  })
                  .map((content, index) => (
                    <div key={index}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              fontSize: 19,
                              height: 35,
                              width: 35,
                            }}
                            src={content.profileImage}
                          >
                            {content.username.charAt(0).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            usage === REUSABLE.NOTIFICATION ? (
                              <Typography
                                sx={{ fontSize: 11 }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    `<b>${content.username}</b> ` +
                                    content.message,
                                }}
                              />
                            ) : (
                              content.name
                            )
                          }
                          secondary={
                            usage === REUSABLE.NOTIFICATION
                              ? getNotifcationTimestamp(
                                  new Date(content.timestamp)
                                )
                              : content.username
                          }
                          primaryTypographyProps={{ sx: { fontSize: 12 } }}
                          secondaryTypographyProps={{ sx: { fontSize: 12 } }}
                        />
                        {usage === REUSABLE.NOTIFICATION ? (
                          <></>
                        ) : (
                          <div>
                            {usage === REUSABLE.REQUEST ? (
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
                              {usage === REUSABLE.REQUEST ? "Reject" : "Remove"}
                            </Button>
                          </div>
                        )}
                      </ListItem>
                      {contents.length > 1 ? (
                        <Divider variant="inset" component="li" />
                      ) : (
                        <></>
                      )}
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
