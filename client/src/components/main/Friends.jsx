import React, { useState, useEffect } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import HowToRegIcon from "@mui/icons-material/HowToReg";
// import { posts } from "./post";
import { UserInfoService } from "../../services/UserInfoService";
import { FriendService } from "../../services/FriendService";

const Friends = ({ requests, myfriends }) => {
  const [requested, setrequested] = useState({});
  const [userInfo, setuserInfo] = useState(null);
  const [users, setusers] = useState([]);
  const [friends, setfriends] = useState(null);
  const getAllUsers = async () => {
    if (userInfo != null) {
      const allUsers = await userInfo.getAllusers();
      setusers(allUsers);
    }
  };

  const getRecommendations = async () => {
    const friendsOrRequests = [];
    // console.log(myfriends)
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
    // console.log(friendsOrRequests)
    const recUsers = await userInfo.getRecommendations(friendsOrRequests);
    console.log(recUsers)
    setusers(recUsers);
  };
  useEffect(() => {
    setuserInfo(new UserInfoService());
    setfriends(new FriendService());
  }, []);

  useEffect(() => {
    if(friends!=null){
      getRecommendations();
    }
  },[friends]);

  const handleClick = async (user, event) => {
    // event.preventDefault();
    setrequested({ ...requested, [event.currentTarget.id]: true });
    console.log(user);
    console.log(event.currentTarget.id);
    const userId = window.sessionStorage.getItem("userId");
    const password = window.sessionStorage.getItem("password");
    const addFriend = await friends.addFriend(
      userId,
      password,
      user.userId,
      false
    );
    // console.log(requested);
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
        {users
          .filter(
            (user) => user.username != window.sessionStorage.getItem("username")
          )
          .map((user, index) => (
            <div>
              <ListItem key={"fr" + index}>
                <ListItemAvatar>
                  <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.username} />
                <div id={"fr" + index} onClick={(e) => handleClick(user, e)}>
                  {/* <PersonAddAlt1Icon
                  style={{
                    cursor: "pointer",
                    float: "right",
                    marginBottom: "8px",
                    fontSize: "20px",
                  }}
                /> */}
                  {requested["fr" + index] ? (
                    <HowToRegIcon
                      style={{
                        cursor: "pointer",
                        float: "right",
                        marginBottom: "8px",
                        fontSize: "20px",
                      }}
                    />
                  ) : (
                    <PersonAddAlt1Icon
                      style={{
                        cursor: "pointer",
                        float: "right",
                        marginBottom: "8px",
                        fontSize: "20px",
                      }}
                    />
                  )}
                </div>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
      </List>
    </div>
  );
};
export default Friends;
