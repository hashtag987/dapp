import React, { useState, useEffect } from "react";
import { UserService } from "../../services/UserService";
import { FriendService } from "../../services/FriendService";
import CircularProgress from "@mui/material/CircularProgress";
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
import { create } from "ipfs-http-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LOGO_COLOR, URL } from "../../constants";
import Alertbox from "../../utils/AlertBox";
import { UserInfoService } from "../../services/UserInfoService";
const Account = () => {
  const navigate = useNavigate();
  const [usersvc, setusersvc] = useState(null);
  const [friendsvc, setfriendsvc] = useState(null);
  const [uinfosvc, setuinfosvc] = useState(null);
  const [userId, setuserId] = useState("");
  const [username, setusername] = useState("");
  const [balance, setbalance] = useState(0);
  const [friends, setfriends] = useState(0);
  const [Transactions, setTransactions] = useState(0);
  const [messagealert, setmessagealert] = useState(false);
  const [message, setmessage] = useState("");
  const [severity, setseverity] = useState("success");
  const [imageURL, setimageURL] = useState("");
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setfriendsvc(new FriendService());
    setusersvc(new UserService());
    setuinfosvc(new UserInfoService());
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

  useEffect(() => {
    if (uinfosvc != null) {
      getProfile();
    }
  }, [uinfosvc]);

  const changeProfile = async () => {
    try {
      await uinfosvc.changeProfile(
        userId,
        window.sessionStorage.getItem("password"),
        imageURL
      );
      setmessagealert(true);
      setmessage("Profile updated Successfully");
      setseverity("success");
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const image = await uinfosvc.getProfile(userId);
      setimageURL(image);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (event) => {
    try {
      setloading(true);
      const file = event.target.files[0];
      const TOKEN = await axios.post(URL.DOMAIN + URL.TOKEN_BUFFER, {
        id: process.env.REACT_APP_IPFS_PROJECT_ID,
        key: process.env.REACT_APP_IPFS_PROJECT_SECRECT,
      });
      const auth = "Basic " + TOKEN.data.data;

      const client = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
          authorization: auth,
        },
      });
      const { cid } = await client.add(file);
      const url = `https://test-arun.infura-ipfs.io/ipfs/${cid}`;
      
      setimageURL(url);
      if (url !== undefined) {
        setloading(false);
      }
      // setmessagealert(true);
      // setmessage("Looking good!");
      // setseverity("success");
    } catch (error) {
      console.log(error);
    }
  };
  const handleAlertClose = () => {
    setmessagealert(false);
  };
  const getFriendsCount = async () => {
    try {
      const friends = await friendsvc.getFriends(userId);
      setfriends(friends.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getTransactionsCount = async () => {
    try {
      const txcount = await usersvc.getTransactionsCount(userId);
      setTransactions(txcount);
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const balance = await usersvc.getBalance(userId);
      setbalance(Math.round(balance * 100) / 100);
    } catch (error) {
      console.log(error);
    }
  };
  const style = {
    minWidth: 200,
    height: 140,
    boxShadow: "0 50px 40px -30px rgba(45, 45, 45, 0.27)",
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
  };
  return (
    <div>
      <Alertbox
        openalert={messagealert}
        handleAlertClose={handleAlertClose}
        message={message}
        severity={severity}
      ></Alertbox>
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
              <Avatar sx={{ width: 150, height: 150 }} src={imageURL}></Avatar>
            </div>
            <div class="main__settings-form">
              <Button
                variant="text"
                component="label"
                className="profile-change"
              >
                Change profile
                <input type="file" onChange={uploadImage} hidden />
                {loading ? (
                  <CircularProgress
                    style={{ height: 20, width: 20, padding: 5 }}
                  />
                ) : (
                  <></>
                )}
              </Button>

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
                onClick={changeProfile}
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
