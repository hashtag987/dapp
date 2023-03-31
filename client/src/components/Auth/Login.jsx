import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { UserService } from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { URL, STATUS_MESSAGE } from "../../constants";
import Alertbox from "../../utils/AlertBox";
import { UserInfoService } from "../../services/UserInfoService";
const Login = () => {
  const navigate = useNavigate();
  const [messagealert, setmessagealert] = useState(false);
  const [message, setmessage] = useState("");
  const [severity, setseverity] = useState("success");
  const [user, setuser] = useState(null);
  const [userinfo, setuserinfo] = useState(null);

  const [usernameerror, setusernameerror] = useState("");
  const [passworderror, setpassworderror] = useState("");
  useEffect(() => {
    setuser(new UserService());
    setuserinfo(new UserInfoService());
  }, []);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleAlertClose = () => {
    setmessagealert(false);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    if (input.name === "username" && input.value.length > 0) {
      setusernameerror("");
    }
    if (input.name === "password" && input.value.length > 0) {
      setpassworderror("");
    }
  };

  const handleSubmit = async (e) => {
    try {
      if (data.username.length > 0 && data.password.length > 0) {
        const userData = await axios.post(URL.DOMAIN + URL.USER_EXISTS, {
          username: data.username,
        });
        console.log(userData);
        const userExists = await user.userExists(userData.data.userHash);
        console.log(userExists);
        if (userExists.status !== "200") {
          setmessage(STATUS_MESSAGE.USER_DOESNT_EXISTS);
          setseverity("error");
          setmessagealert(true);
          return;
        }
        const signature = await user.getSignature(userData.data.userHash);
        console.log(signature);
        const res = await axios.post(URL.DOMAIN + URL.VERIFY_USER, {
          username: userData.data.userHash,
          mpk: signature.masterPublicKey,
          signature: signature.signature,
          password: data.password,
        });
        console.log(res);
        if (res.status === 200 && res.data.verified) {
          // console.log("deoiiiiiii")
          const userInfo = await userinfo.getUser(data.username);
          console.log("user info ");
          console.log(userInfo);
          //try {
          // const encPW=await axios.post(URL.DOMAIN+URL.ENCRYPT_PASSWORD,{password:data.password,mpk:userInfo.masterPublicKey});
          // console.log(encPW.data.encryptedPW);
          const userDetails = await user.getUser(userData.data.userHash);
          //console.log(trace)
          // } catch (error) {
          //   console.log(error)
          // }
          window.sessionStorage.setItem("name", userInfo.name);
          window.sessionStorage.setItem("username", userInfo.username);
          window.sessionStorage.setItem("mpk", userInfo.masterPublicKey);
          window.sessionStorage.setItem("userId", userInfo.userId);
          window.sessionStorage.setItem("token", userDetails.trace);
          window.sessionStorage.setItem("password", userDetails.password);
          setmessagealert(true);
          setmessage(STATUS_MESSAGE.LOGIN_SUCCESS);
          setseverity("success");
          setTimeout(() => {
            navigate("/home/" + userInfo.username);
          }, 2000);
        } else {
          setmessagealert(true);
          setmessage(STATUS_MESSAGE.INVALID_USER);
          setseverity("error");
        }
      } else {
        if (data.username.length === 0)
          setusernameerror("Username is not allowed to be empty");
        if (data.password.length === 0)
          setpassworderror("Password is not allowed to be empty");
      }
    } catch (error) {
      setmessagealert(true);
      setmessage(STATUS_MESSAGE.TRANSACTION_ERROR);
      setseverity("error");
    }
  };
  return (
    <div className="form-container">
      <h3 className="logo">SOCIALIZE</h3>
      <Container component="main" maxWidth="xs">
        <Alertbox
          openalert={messagealert}
          handleAlertClose={handleAlertClose}
          message={message}
          severity={severity}
        ></Alertbox>
        <div className="center">
          <p className="header-text">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString("Welcome Back").pauseFor(1000).start();
              }}
            />
          </p>
          <form>
            {usernameerror.length === 0 ? (
              <TextField
                name="username"
                id="outlined-basic"
                label="Username"
                value={data.username}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="medium"
                style={{ margin: "10px" }}
                autoComplete="off !important"
                inputProps={{ style: { fontSize: 13 } }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />
            ) : (
              <TextField
                error
                name="username"
                id="outlined-basic"
                label="Username"
                value={data.username}
                onChange={handleChange}
                variant="standard"
                fullWidth
                helperText={usernameerror}
                size="medium"
                style={{ margin: "10px" }}
                autoComplete="off !important"
                inputProps={{ style: { fontSize: 13 } }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />
            )}
            {passworderror.length === 0 ? (
              <TextField
                name="password"
                id="outlined-basic"
                label="Password"
                value={data.password}
                onChange={handleChange}
                type="password"
                variant="standard"
                fullWidth
                size="medium"
                style={{ margin: "10px" }}
                autoComplete="off"
                inputProps={{ style: { fontSize: 13 } }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />
            ) : (
              <TextField
                error
                helperText={passworderror}
                name="password"
                id="outlined-basic"
                label="Password"
                value={data.password}
                onChange={handleChange}
                type="password"
                variant="standard"
                fullWidth
                size="medium"
                style={{ margin: "10px" }}
                autoComplete="off"
                inputProps={{ style: { fontSize: 13 } }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />
            )}
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              size="medium"
              style={{ margin: "10px", textTransform: "none" }}
            >
              Log in
            </Button>
            <div
              className="login-redirect"
              style={{
                textAlign: "center",
                fontSize: 13,
              }}
            >
              Don't have an account? <Link to="/">Register here</Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
