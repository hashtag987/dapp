import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Button } from "@mui/material";
import { LOGO_COLOR, REUSABLE, STATUS_MESSAGE } from "../../../constants";
import { UserInfoService } from "../../../services/UserInfoService";
import { FriendService } from "../../../services/FriendService";
import { UserService } from "../../../services/UserService";
const SearchFriends = ({
  searchContent,
  sendRequest,
  removeRequest,
  getFriends,
  getRequests,
}) => {
  const [requested, setrequested] = useState({});
  const [usersvc, setusersvc] = useState(null);
  const [friendsvc, setfriendsvc] = useState(null);
  const [userInfosvc, setuserInfosvc] = useState(null);
  const [users, setusers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);
  const [myFriends, setmyFriends] = useState([]);
  const [requests, setrequests] = useState([]);
  const [requestedFriends, setrequestedFriends] = useState([]);
  useEffect(() => {
    setfriendsvc(new FriendService());
    setuserInfosvc(new UserInfoService());
    setusersvc(new UserService());
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [userInfosvc]);

  useEffect(() => {
    getAllUsers();
    setfilteredUsers(
      users.filter((user) => {
        return (
          user.username.toLowerCase().includes(searchContent.toLowerCase()) &&
          user.username !== window.sessionStorage.getItem("username") &&
          !myFriends.includes(user.userId) &&
          !requests.includes(user.userId)
        );
      })
    );
  }, [searchContent]);

  const handleAddUndoFriend = async (user, event) => {
    try {
      setrequested({
        ...requested,
        [event.currentTarget.id]: !requested[event.currentTarget.id],
      });
      if (event.currentTarget.className === "sendRequest") {
        await sendRequest(user);
      } else {
        await removeRequest(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    zIndex: 2,
    position: "absolute",
    top: "55px",
    left: "30px",
    width: 300,
    borderRadius: 4,
    bgcolor: "background.paper",
    boxShadow: 10,
    p: 0,
  };

  const getAllUsers = async () => {
    try {
      if (userInfosvc != null) {
        const allUsers = await userInfosvc.getAllusers();
        setusers(allUsers);

        let friendIds = [];
        const friends = await getFriends();
        for (let friend of friends) {
          friendIds.push(friend.userId);
        }
        setmyFriends(friendIds);

        let requestsIds = [];
        const myrequests = await getRequests();
        for (let request of myrequests) {
          requestsIds.push(request.userid);
        }
        setrequests(requestsIds);

        const requestedFriends = await friendsvc.getRequested(
          window.sessionStorage.getItem("userId")
        );
        let requestedIds = [];
        for (let requestedId of requestedFriends) {
          if (requestedId.length > 0) {
            setrequested({
              ...requested,
              [requestedId]: true,
            });
            requestedIds.push(requestedId);
          }
        }
        setrequestedFriends(requestedIds);
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
            <div style={{ maxHeight: 300, overflow: "auto" }}>
              {filteredUsers.length === 0 ? (
                <div className="message-center">
                  {STATUS_MESSAGE.EMPTY_USERS}
                </div>
              ) : (
                filteredUsers.map((user, index) => (
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
                      <div
                        id={user.userId}
                        className={
                          requested[user.userId]
                            ? "removeRequest"
                            : "sendRequest"
                        }
                        onClick={(e) => handleAddUndoFriend(user, e)}
                      >
                        {requested[user.userId] ? (
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
                    {filteredUsers.length > 1 ? (
                      <Divider variant="inset" component="li" />
                    ) : (
                      <></>
                    )}
                  </div>
                ))
              )}
            </div>
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
