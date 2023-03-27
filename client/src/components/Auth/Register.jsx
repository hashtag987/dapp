import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { UserService } from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { URL, STATUS_MESSAGE } from "../../constants";
import Alertbox from "../../utils/AlertBox";
import { UserInfoService } from "../../services/UserInfoService";
const Register = () => {
  let account = "";
  const navigate = useNavigate();
  const [messagealert, setmessagealert] = useState(false);
  const [message, setmessage] = useState("");
  const [severity, setseverity] = useState("success");
  const [user, setuser] = useState(null);
  const [userInfo, setuserInfo] = useState(null);

  const [nameerror, setnameerror] = useState("");
  const [usernameerror, setusernameerror] = useState("");
  const [cpassworderror, setcpassworderror] = useState("");
  const [passwordcheck, setpasswordcheck] = useState([]);
  useEffect(() => {
    setuser(new UserService());
    setuserInfo(new UserInfoService());
  }, []);

  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    token: "",
    confirmpassword: "",
  });

  const handleAlertClose = () => {
    setmessagealert(false);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    if (input.name === "name" && input.value.length > 0) {
      setnameerror("");
    }
    if (input.name === "username" && input.value.length > 0) {
      setusernameerror("");
    }
    if (input.name === "password" && input.value.length > 0) {
      setpasswordcheck([]);
    }
    if (input.name === "confirmpassword" && input.value.length > 0) {
      setcpassworderror("");
    }
  };

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(URL.DOMAIN + URL.CREATE_USER, data);
      console.log(res);
      if (res.status === 200) {
        const userData = await axios.post(URL.DOMAIN + URL.USER_EXISTS, {
          username: data.username,
        });
        console.log(userData);
        const userExists = await user.userExists(userData.data.userHash);
        console.log(userExists);
        if (userExists.status === "200") {
          setmessage(STATUS_MESSAGE.USER_ALREADY_EXISTS);
          setseverity("error");
          setmessagealert(true);
          return;
        }
        if (data.password !== data.confirmpassword) {
          setcpassworderror("Password doesn't match");
          return;
        }
        const encData = res.data.data;
        await user.create_user(encData.passwordEnc).then((value) => {
          account = value;
        });
        data.token = "sampletoken";
        await user.adduser(
          encData.nameEnc,
          encData.passwordEnc,
          encData.masterPublicKey,
          encData.tokenEnc,
          account
        );
        await user.sign(
          encData.userHash,
          encData.masterPublicKey,
          encData.signature,
          account,
          encData.passwordEnc
        );
        await userInfo.addUserInfo(
          data.name,
          data.username,
          encData.passwordEnc,
          encData.masterPublicKey,
          account
        );
        window.sessionStorage.setItem("name", data.name);
        window.sessionStorage.setItem("username", data.username);
        window.sessionStorage.setItem("token",)
        const users = await userInfo.getAllusers();
        console.log(users);
        setmessagealert(true);
        setmessage(STATUS_MESSAGE.REGISTER_SUCCESS);
        setseverity("success");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        let pass_err = [];
        for (let err of error.response.data.data) {
          if (err.message.includes("Username")) {
            setusernameerror(err.message.replaceAll('"', ""));
          } else if (err.message.includes("Name")) {
            setnameerror(err.message.replaceAll('"', ""));
          } else if (err.message.includes("Conformation Password")) {
            setcpassworderror(err.message.replaceAll('"', ""));
          } else if (err.message.includes("Password")) {
            pass_err.push(err.message.replaceAll('"', ""));
          }
        }
        if (pass_err.length > 0 && data.password !== data.confirmpassword) {
          setcpassworderror("Password doesn't match");
        }
        setpasswordcheck(pass_err);
      } else {
        setmessagealert(true);
        setmessage(STATUS_MESSAGE.TRANSACTION_ERROR);
        setseverity("error");
      }
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
                typewriter.typeString("Hello there...").pauseFor(1000).start();
              }}
            />
          </p>
          <form>
            {nameerror.length === 0 ? (
              <TextField
                name="name"
                id="outlined-basic"
                label="Name"
                value={data.name}
                onChange={handleChange}
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
                name="name"
                id="outlined-basic"
                label="Name"
                value={data.name}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="medium"
                style={{ margin: "10px" }}
                helperText={nameerror}
                autoComplete="off"
                inputProps={{ style: { fontSize: 13 } }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />
            )}
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
            {passwordcheck.length === 0 ? (
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
                helperText={
                  <>
                    {passwordcheck.map((message) => (
                      <>
                        {message}
                        <br></br>
                      </>
                    ))}
                  </>
                }
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
            {cpassworderror.length === 0 ? (
              <TextField
                name="confirmpassword"
                id="outlined-basic"
                label="Confirm Password"
                value={data.confirmpassword}
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
                helperText={cpassworderror}
                name="confirmpassword"
                id="outlined-basic"
                label="Confirm Password"
                value={data.confirmpassword}
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
              Sign Up
            </Button>
            <div
              className="login-redirect"
              style={{
                textAlign: "center",
                fontSize: 13,
              }}
            >
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Register;
