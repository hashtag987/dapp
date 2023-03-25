import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { UserService } from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { ContainerService } from "../../services/ContainerService";
import axios from "axios";
import { URL } from "../../constants";
const Register = () => {
  let account = "";
  const navigate = useNavigate();
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

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    const res = await axios.post(URL.DOMAIN + URL.CREATE_USER, data);
    if (res.status === 200) {
      const encData = res.data.data;
      await user.create_user(encData.passwordEnc).then((value) => {
        account = value;
      });
      cont.setId(account);
      data.token = "sampletoken";
      const addres = await user.adduser(
        encData.nameEnc,
        encData.passwordEnc,
        encData.masterPublicKey,
        encData.tokenEnc,
        account
      );
      const signed = await user.sign(
        encData.userHash,
        encData.masterPublicKey,
        encData.signature,
        account,
        encData.passwordEnc
      );
      alert("done");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
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
  );
};

export default Register;
