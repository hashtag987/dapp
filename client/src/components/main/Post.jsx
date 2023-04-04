import * as React from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import UploadIcon from "@mui/icons-material/Upload";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Button, CardMedia, Tooltip } from "@mui/material";
import { create } from "ipfs-http-client";
import { useState, useEffect } from "react";
import { PostService } from "../../services/PostService";
import { FriendService } from "../../services/FriendService";
import { UserInfoService } from "../../services/UserInfoService";
import { LOGO_COLOR, STATUS_MESSAGE, URL } from "../../constants";
import axios from "axios";
import { UserService } from "../../services/UserService";
import Alertbox from "../../utils/AlertBox";
// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

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
  const [imageURL, setimageURL] = useState("");
  const [profileImage, setprofileImage] = useState("");

  useEffect(() => {
    setuinfo(new UserInfoService());
    setpostsvc(new PostService());
    setfriendsvc(new FriendService());
    setusersvc(new UserService());
  }, []);

  const getPostTimestamp = (postDate) => {
    const currentDate = new Date();
    const ONE_MINUTE_IN_MS = 60000;
    const diffInMs = currentDate.getTime() - postDate.getTime();
    const diffInMin = Math.floor(diffInMs / ONE_MINUTE_IN_MS);
    // Convert both dates to UTC to remove the time zone offset
    const utcCurrentDate = Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const utcPostDate = Date.UTC(
      postDate.getFullYear(),
      postDate.getMonth(),
      postDate.getDate()
    );

    const daysDifference = Math.floor(
      (utcCurrentDate - utcPostDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInMin < 1) {
      return "Just now";
    } else if (daysDifference === 0) {
      return postDate.toLocaleTimeString();
    } else if (daysDifference === 1) {
      return "Yesterday";
    } else {
      postDate = postDate.toDateString().split(" ");
      return postDate[1] + " " + postDate[2] + "," + postDate[3];
    }
  };

  const handleAlertClose = () => {
    setmessagealert(false);
  };

  useEffect(() => {
    async function sample() {
      if (postsvc != null) {
        getPosts();
      }
    }
    sample();
  }, [postsvc]);

  const getProfile = async () => {
    try {
      const image = await uinfo.getProfile(
        window.sessionStorage.getItem("userId")
      );
      // console.log(image);
      setprofileImage(image);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileById = async (userId) => {
    try {
      const image = await uinfo.getProfile(userId);
      console.log(image);
      return image;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (uinfo != null) {
      getProfile();
    }
  }, [uinfo]);

  const getPosts = async () => {
    try {
      const userId = window.sessionStorage.getItem("userId");
      const posts = await postsvc.getPosts(userId);
      let postsWithUser = [];
      for (let post of posts) {
        const userInfo = await uinfo.getUserById(post.userId);
        let tempPost = post;
        let msk = window.sessionStorage.getItem("token");
        const res = await axios.post(URL.DOMAIN + URL.DECRYPT_POST, {
          post: post.post.toString("base64"),
          msk: msk.toString("base64"),
        });
        tempPost.post = res.data.decPost;
        tempPost.username = userInfo.username;
        tempPost.profile = await getProfileById(userInfo.userId);
        postsWithUser.push(tempPost);
      }
      postsWithUser = postsWithUser.sort(
        (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
      );
      console.log(postsWithUser);
      setposts(postsWithUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setnewpost(input.value);
  };

  const uploadImage = async (event) => {
    try {
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
      setmessagealert(true);
      setmessage("Image Uploaded");
      setseverity("success");
      setimageURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async () => {
    try {
      if (newpost.length === 0 && imageURL.length === 0) {
        setmessagealert(true);
        setmessage(STATUS_MESSAGE.EMPTY_POST_CONTENT);
        setseverity("error");
        return;
      }
      const userId = window.sessionStorage.getItem("userId");
      const password = window.sessionStorage.getItem("password");
      const hasImage = imageURL.length > 0;
      let imageHash = "";
      if (hasImage) {
        imageHash = imageURL;
      }
      const myFriends = await friendsvc.getFriends(userId);
      const now = new Date().toLocaleString();
      // let dateString = today.toDateString().split(" ");
      // let now = dateString[1] + " " + dateString[2] + "," + dateString[3];
      const res = await axios.post(URL.DOMAIN + URL.ENCRYPT_POST, {
        post: newpost,
        mpk: window.sessionStorage.getItem("mpk"),
      });
      await postsvc
        .createPost(
          userId,
          password,
          res.data.encPost,
          now,
          hasImage,
          imageHash
        )
        .then(() => {
          getPosts();
        });
      for (let friend of myFriends) {
        const userInfo = await uinfo.getUserById(friend.userid);
        const res = await axios.post(URL.DOMAIN + URL.ENCRYPT_POST, {
          post: newpost,
          mpk: userInfo.masterPublicKey,
        });
        await postsvc.mapPostToFriend(
          userId,
          password,
          res.data.encPost,
          now,
          friend.userid,
          hasImage,
          imageHash
        );
      }
      setimageURL("");
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
      <Card sx={{ maxWidth: 550, marginBottom: 2 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: LOGO_COLOR }}
              aria-label="recipe"
              src={profileImage}
            ></Avatar>
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
              style={{ width: 500, fontFamily: "sans-serif !important" }}
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
              width: 75,
              height: 30,
              fontSize: 12,
              backgroundColor: LOGO_COLOR,
            }}
          >
            Post <SendIcon sx={{ paddingLeft: 1, fontSize: "15px" }} />
          </Button>
          <Tooltip title="Upload Image" arrow>
            <IconButton
              variant="outlined"
              component="label"
              size="medium"
              style={{
                marginTop: "-10px",
                marginLeft: "8px",
                textTransform: "none",
                width: 30,
                height: 30,
                backgroundColor: "",
              }}
            >
              <UploadIcon sx={{ color: LOGO_COLOR }} />
              <input type="file" onChange={uploadImage} hidden />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      {posts.length === 0 ? (
        <div className="message-center">{STATUS_MESSAGE.EMPTY_POSTS}</div>
      ) : (
        posts.map((post, index) => (
          <Card sx={{ maxWidth: 550, marginBottom: 2 }} key={index}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: LOGO_COLOR }} aria-label="recipe" src={post.profile}>
                  {post.username.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={post.username}
              subheader={getPostTimestamp(new Date(post.timeStamp))}
            />
            {post.hasImage ? (
              <CardMedia
                component="img"
                height="394"
                image={post.imageHash}
                alt="Paella dish"
              />
            ) : (
              <></>
            )}
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ wordWrap: "break-word" }}
              >
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
