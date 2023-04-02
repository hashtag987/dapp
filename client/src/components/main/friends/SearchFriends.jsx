import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Button } from "@mui/material";
import { REUSABLE, STATUS_MESSAGE } from "../../../constants";
import { UserInfoService } from "../../../services/UserInfoService";
import { FriendService } from "../../../services/FriendService";
import { UserService } from "../../../services/UserService";
const SearchFriends = ({ searchContent }) => {
  const [usersvc, setusersvc] = useState(null);
  const [friendsvc, setfriendsvc] = useState(null);
  const [userInfosvc, setuserInfosvc] = useState(null);
  const [users, setusers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);
  useEffect(() => {
    setfriendsvc(new FriendService());
    setuserInfosvc(new UserInfoService());
    setusersvc(new UserService());
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [userInfosvc]);

  useEffect(() => {
    setfilteredUsers(
      users.filter((user) => {
        return user.name.toLowerCase().includes(searchContent.toLowerCase());
      })
    );
  }, [searchContent]);

  const style = {
    zIndex: 2,
    position: "absolute",
    top: "50px",
    left: "30px",
    width: 300,
    borderRadius: 1,
    bgcolor: "background.paper",
    boxShadow: 10,
    p: 0,
  };

  const getAllUsers = async () => {
    try {
      if (userInfosvc != null) {
        const allUsers = await userInfosvc.getAllusers();
        setusers(allUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {searchContent.length > 0 ? (
        <Box sx={style}>
          <List>
            {filteredUsers.length === 0 ? (
              <div className="message-center">{STATUS_MESSAGE.EMPTY_USERS}</div>
            ) : (
              filteredUsers.map((user, index) => (
                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          fontSize: 19,
                          height: 35,
                          width: 35,
                        }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={user.username}
                      primaryTypographyProps={{ sx: { fontSize: 12 } }}
                      secondaryTypographyProps={{ sx: { fontSize: 12 } }}
                    />
                    {/* <div id={"fgfh"}>
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
                        {usage === REUSABLE.NOTIFICATION ? "Reject" : "Remove"}
                      </Button>
                    </div> */}
                  </ListItem>
                  {/* {filteredUsers.length > 1 ? (
                    <Divider variant="inset" component="li" />
                  ) : (
                    <></>
                  )} */}
                </div>
              ))
            )}
          </List>
        </Box>
      ) : (
        <></>
      )}
    </div>
    // <div className="dssd">sddsd</div>
  );
};

export default SearchFriends;
