import React, { useState, useEffect } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { UserInfoService } from "../../../services/UserInfoService";
import { FriendService } from "../../../services/FriendService";
import { LOGO_COLOR, UI } from "../../../constants";
const FriendRecommendations = ({ getRequests, getFriends }) => {
  const [requested, setrequested] = useState({});
  const [userInfo, setuserInfo] = useState(null);
  const [users, setusers] = useState([]);
  const [friends, setfriends] = useState(null);
  const getRecommendations = async () => {
    try {
      const friendsOrRequests = [];
      const requests = await getRequests();
      const myfriends = await getFriends();
      const userId = window.sessionStorage.getItem("userId");
      const requestedFriends = await friends.getRequested(userId);
      for (let user of requests) {
        if (user.userId.length > 0) {
          friendsOrRequests.push(user.userId);
        }
      }
      for (let user of myfriends) {
        if (user.userId.length > 0) {
          friendsOrRequests.push(user.userId);
        }
      }
      for (let user of requestedFriends) {
        if (user.length > 0) {
          friendsOrRequests.push(user);
        }
      }
      let recUsers = await userInfo.getRecommendations(friendsOrRequests);
      recUsers = recUsers.filter((user) => {
        return (
          user.username !== window.sessionStorage.getItem("username") &&
          user.username.length > 0
        );
      });
      setusers(recUsers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setuserInfo(new UserInfoService());
    setfriends(new FriendService());
  }, []);

  useEffect(() => {
    if (friends != null) {
      getRecommendations();
    }
  }, [friends, requested]);

  const handleClick = async (user, event) => {
    try {
      setrequested({ ...requested, [event.currentTarget.id]: true });
      const userId = window.sessionStorage.getItem("userId");
      const password = window.sessionStorage.getItem("password");
      await friends.addFriend(userId, password, user.userId, false);
      await friends.addToRequested(userId, password, user.userId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cards">
      <div className="recommedantions-header">
        {UI.RECOMMENDATIONS_HEADER}
        <Divider sx={{ width: 250, pt: 1,borderBottomWidth: 2 }} />
      </div>
      <List
        sx={{
          marginTop: 7,
          marginLeft: 10,
          height: 300,
          width: 280,
          bgcolor: "background.paper",
          padding: "10px",
          overflow: "auto",
          p: -1,
        }}
      >
        {users.length === 0 ? (
          <div className="message-center">
            {'\u00A0'}{'\u00A0'}{'\u00A0'}There are currently no <br/>recommedantions for you
          </div>
        ) : (
          users
            .filter(
              (user) =>
                user.username !== window.sessionStorage.getItem("username") &&
                user.username.length > 0
            )
            .map((user, index) => (
              <div key={index}>
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
                  <div id={"fr" + index} onClick={(e) => handleClick(user, e)}>
                    {requested["fr" + index] ? (
                      <HowToRegIcon
                        style={{
                          cursor: "pointer",
                          float: "right",
                          marginBottom: "8px",
                          fontSize: "20px",
                          color: LOGO_COLOR,
                        }}
                      />
                    ) : (
                      <PersonAddAlt1Icon
                        style={{
                          cursor: "pointer",
                          float: "right",
                          marginBottom: "8px",
                          fontSize: "20px",
                          color: LOGO_COLOR,
                        }}
                      />
                    )}
                  </div>
                </ListItem>
              </div>
            ))
        )}
        {/* {users
          .filter(
            (user) =>
              user.username !== window.sessionStorage.getItem("username") &&
              user.username.length > 0
          )
          .map((user, index) => (
            <div key={index}>
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
                <div id={"fr" + index} onClick={(e) => handleClick(user, e)}>
                  {requested["fr" + index] ? (
                    <HowToRegIcon
                      style={{
                        cursor: "pointer",
                        float: "right",
                        marginBottom: "8px",
                        fontSize: "20px",
                        color: LOGO_COLOR,
                      }}
                    />
                  ) : (
                    <PersonAddAlt1Icon
                      style={{
                        cursor: "pointer",
                        float: "right",
                        marginBottom: "8px",
                        fontSize: "20px",
                        color: LOGO_COLOR,
                      }}
                    />
                  )}
                </div>
              </ListItem>
            </div>
          ))} */}
      </List>
    </div>
  );
};
export default FriendRecommendations;
