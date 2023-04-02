import React, { useState, useEffect } from "react";
import { UserService } from "../../services/UserService";
import { FriendService } from "../../services/FriendService";
import {
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { Icon } from "@iconify/react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LOGO_COLOR } from "../../constants";
const Account = () => {
  const navigate = useNavigate();
  const [usersvc, setusersvc] = useState(null);
  const [friendsvc, setfriendsvc] = useState(null);
  const [userId, setuserId] = useState("");
  const [username, setusername] = useState("");
  const [balance, setbalance] = useState(0);
  const [friends, setfriends] = useState(0);
  const [Transactions, setTransactions] = useState(0);
  useEffect(() => {
    setfriendsvc(new FriendService());
    setusersvc(new UserService());
    setuserId(window.sessionStorage.getItem("userId"));
    setusername(window.sessionStorage.getItem("username"));
  }, []);

  useEffect(() => {
    if (friendsvc != null) {
      getFriendsCount();
    }
  }, [friendsvc]);

  useEffect(() => {
    if (usersvc != null) {
      getTransactionsCount();
      getBalance();
    }
  }, [usersvc]);
  const getFriendsCount = async () => {
    try {
      const friends = await friendsvc.getFriends(userId);
      setfriends(friends.length);
      console.log(friends.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getTransactionsCount = async () => {
    try {
      const txcount = await usersvc.getTransactionsCount(userId);
      setTransactions(txcount);
      console.log(txcount);
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const balance = await usersvc.getBalance(userId);
      console.log(balance);
      setbalance(Math.round(balance * 100) / 100);
      console.log(Math.round(balance * 100) / 100);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = () => [console.log("hello")];
  const style = {
    minWidth: 200,
    height: 140,
    boxShadow: "0 50px 40px -30px rgba(45, 45, 45, 0.27)",
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
  };
  return (
    <div>
      <IconButton onClick={() => navigate("/home/" + username)}>
        <ArrowBackIcon className="back-to-home"></ArrowBackIcon>
      </IconButton>
      <div class="container">
        <div class="main">
          <div class="main__header">
            <center>
              <h2>My Account</h2>
            </center>
          </div>
          <div class="main__content">
            <div class="main__avatar">
              <Avatar sx={{ width: 150, height: 150 }}></Avatar>
            </div>
            <div class="main__settings-form">
              <input
                type="file"
                className="profile-change"
                onChange={handleChange}
              />
              <label class="main__input-label">{username}</label>
            </div>
            <div className="cards">
              <Card sx={style} className="card">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: "medium" }}
                    align="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    {"Balance (ETH)"}
                  </Typography>
                  <div className="card-sub-container">
                    <Icon
                      icon="mdi:ethereum"
                      width="40"
                      height="40"
                      color="rgba(0, 0, 0, 0.6)"
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: 19,
                        color: "RGB(19, 160, 223)",
                        fontWeight: "bold",
                      }}
                      className="card-sub-container-number"
                    >
                      {balance}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              <Card sx={style} className="card">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: "medium" }}
                    align="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    {"Friends"}
                  </Typography>
                  <div className="card-sub-container">
                    <GroupsIcon
                      sx={{ fontSize: "2.5rem", color: "rgba(0, 0, 0, 0.6)" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: 19,
                        color: "RGB(249, 137, 139)",
                        fontWeight: "bold",
                      }}
                      className="card-sub-container-number"
                    >
                      {friends}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              <Card sx={style} className="card">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: "medium" }}
                    align="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    {"Transactions"}
                  </Typography>
                  <div className="card-sub-container">
                    <Icon
                      icon="grommet-icons:transaction"
                      width="35"
                      height="35"
                      color="rgba(0, 0, 0, 0.6)"
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: 19,
                        color: "RGB(242, 155, 28)",
                        fontWeight: "bold",
                      }}
                      className="card-sub-container-number"
                    >
                      {Transactions}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="button-group">
              <Button
                variant="contained"
                className="btn-action"
                sx={{ backgroundColor: LOGO_COLOR }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                className="btn-action"
                sx={{ color: LOGO_COLOR, borderColor: LOGO_COLOR }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
