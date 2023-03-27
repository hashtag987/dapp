import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { UserService } from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { ContainerService } from "../../services/ContainerService";
import axios from "axios";
import { URL, STATUS_MESSAGE } from "../../constants";
import Alertbox from "../../utils/AlertBox";
const Register = () => {
  let account = "";
  const navigate = useNavigate();
  const [messagealert, setmessagealert] = useState(false);
  const [message, setmessage] = useState("");
  const [severity, setseverity] = useState("success");
  const [user, setuser] = useState(null);
  const [cont, setcont] = useState(null);
  useEffect(() => {
    setuser(new UserService());
    setcont(new ContainerService());
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
  };

  const handleSubmit = async (e) => {
    try {
      const userData = await axios.post(URL.DOMAIN + URL.USER_EXISTS, {
        username: data.username,
      });
      const userExists = await user.userExists(userData.data.userHash);
      console.log(userExists)
      if (userExists.status === "200") {
        setmessage(STATUS_MESSAGE.USER_ALREADY_EXISTS);
        setseverity("error");
        setmessagealert(true);
        return;
      }
      const res = await axios.post(URL.DOMAIN + URL.CREATE_USER, data);
      if (res.status === 200) {
        const encData = res.data.data;
        await user.create_user(encData.passwordEnc).then((value) => {
          account = value;
        });
        cont.setId(account);
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
        setmessagealert(true);
        setmessage(STATUS_MESSAGE.REGISTER_SUCCESS);
        setseverity("success");
      }
    } catch (error) {
      console.log(error);
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
          <form>
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
            />
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
            />
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
            />
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
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              size="medium"
              style={{ margin: "10px" }}
            >
              Sign Up
            </Button>
            <div className="login-redirect" style={{ textAlign: "center" }}>
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Register;
