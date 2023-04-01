import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { PostService } from "../../services/PostService";
import { FriendService } from "../../services/FriendService";
import { UserInfoService } from "../../services/UserInfoService";
import { STATUS_MESSAGE, URL } from "../../constants";
import axios from "axios";
import { UserService } from "../../services/UserService";
import Alertbox from "../../utils/AlertBox";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post() {
  const [newpost, setnewpost] = useState("");
  const [posts, setposts] = useState([]);
  const [uinfo, setuinfo] = useState(null);
  const [friendsvc, setfriendsvc] = useState(null);
  const [postsvc, setpostsvc] = useState(null);
  const [usersvc, setusersvc] = useState(null);
  const [messagealert, setmessagealert] = useState(false);
  const [message, setmessage] = useState("");
  const [severity, setseverity] = useState("success");

  useEffect(() => {
    setuinfo(new UserInfoService());
    setpostsvc(new PostService());
    setfriendsvc(new FriendService());
    setusersvc(new UserService());
  }, []);

  const handleAlertClose = () => {
    setmessagealert(false);
  };

  useEffect(() => {
    async function sample() {
      if (postsvc != null) {
        getPosts();
        // const userId = window.sessionStorage.getItem("userId");
        // const password = window.sessionStorage.getItem("password");
        // const myFriends = await friendsvc.getFriends(userId);
        // console.log(myFriends);
        // for (let friend of myFriends) {
        //   const userInfo = await uinfo.getUserById(friend.userid);
        //   console.log(userInfo);
        //   const userName = await axios.post(URL.DOMAIN + URL.USER_EXISTS, {
        //     username: userInfo.username,
        //   });
        //   console.log(userInfo.username);
        //   const userDetails = await usersvc.getUser(userName.data.userHash);
        //   console.log(userDetails);
        // }
      }
    }
    sample();
  }, [postsvc]);

  const getPosts = async () => {
    try {
      const userId = window.sessionStorage.getItem("userId");
      const posts = await postsvc.getPosts(userId);
      let postsWithUser = [];
      for (let post of posts) {
        // let msk = "";
        const userInfo = await uinfo.getUserById(post.userId);
        // if (userId === post.userId) {
        //   msk = window.sessionStorage.getItem("token");
        // } else {
        //   const userName = await axios.post(URL.DOMAIN + URL.USER_EXISTS, {
        //     username: userInfo.username,
        //   });
        //   console.log(userInfo.username);
        //   const userDetails = await usersvc.getUser(userName.data.userHash);
        //   console.log(userDetails);
        //   msk = userDetails.trace;
        // }
        // const res = await axios.post(URL.DOMAIN + URL.DECRYPT_POST, {
        //   post: post.post,
        //   msk: msk,
        // });

        let tempPost = post;
        // tempPost.post = res.data.decPost;
        tempPost.username = userInfo.username;
        postsWithUser.push(tempPost);
      }
      console.log("post");
      console.log(posts);
      setposts(postsWithUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setnewpost(input.value);
    console.log(newpost);
  };

  const createPost = async () => {
    try {
      if (newpost.length === 0) {
        setmessagealert(true);
        setmessage(STATUS_MESSAGE.EMPTY_POST_CONTENT);
        setseverity("error");
        return;
      }
      const userId = window.sessionStorage.getItem("userId");
      const password = window.sessionStorage.getItem("password");
      const myFriends = await friendsvc.getFriends(userId);
      console.log("***********post friends*************");
      console.log(myFriends);
      var today = new Date();
      let dateString = today.toDateString().split(" ");
      let now = dateString[1] + " " + dateString[2] + "," + dateString[3];
      // const res = await axios.post(URL.DOMAIN + URL.ENCRYPT_POST, {
      //   post: newpost,
      //   mpk: window.sessionStorage.getItem("mpk"),
      // });
      // console.log(res);
      const postResponse = await postsvc
        .createPost(userId, password, newpost, now)
        .then(() => {
          getPosts();
        });

      for (let friend of myFriends) {
        // const userInfo = await uinfo.getUserById(friend.userid);
        // const res = await axios.post(URL.DOMAIN + URL.ENCRYPT_POST, {
        //   post: newpost,
        //   mpk: userInfo.masterPublicKey,
        // });
        // console.log("*************mpk************");
        // console.log(res);
        // console.log(userInfo.masterPublicKey);
        await postsvc.mapPostToFriend(
          userId,
          password,
          newpost,
          now,
          friend.userid
        );
      }
      setnewpost("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        marginTop: 9,
        marginleft: 100,
        position: "absolute",
        top: 110,
        left: 400,
      }}
    >
      <Alertbox
        openalert={messagealert}
        handleAlertClose={handleAlertClose}
        message={message}
        severity={severity}
      ></Alertbox>
      <Card sx={{ maxWidth: 600, marginBottom: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
          }
          title="You"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              onChange={handleChange}
              placeholder="What's on your mind"
              style={{ width: 550, fontFamily: "sans-serif !important" }}
            />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={createPost}
            variant="contained"
            size="medium"
            style={{
              marginTop: "-10px",
              marginLeft: "8px",
              textTransform: "none",
              width: 130,
              backgroundColor: "",
            }}
          >
            Post
          </Button>
          <Button
            variant="outlined"
            component="label"
            size="medium"
            style={{
              marginTop: "-10px",
              marginLeft: "8px",
              textTransform: "none",
              width: 130,
              backgroundColor: "",
            }}
          >
            Upload image
            <input type="file" hidden />
          </Button>
        </CardActions>
      </Card>
      {posts.length == 0 ? (
        <div className="message-center">{STATUS_MESSAGE.EMPTY_POSTS}</div>
      ) : (
        posts.map((post, index) => (
          <Card sx={{ maxWidth: 600, marginBottom: 2 }} key={index}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {post.username.charAt(0).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.username}
              subheader={post.timeStamp}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.post}
              </Typography>
            </CardContent>
            <CardActions disableSpacing></CardActions>
          </Card>
        ))
      )}
    </div>
  );
}
