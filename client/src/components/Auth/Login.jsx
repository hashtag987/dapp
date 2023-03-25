import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { UserService } from "../../services/UserService";
import { ContainerService } from "../../services/ContainerService";
// import { IpfsService } from "../../services/IpfsService";
import { Web3AuthService } from "../../services/Web3AuthService";
import { UserInfoService } from "../../services/UserInfoService";
import { Link } from "react-router-dom";
const Login = () => {
  let x = "";
  let account = "";
  let uName = "";
  const [auth, setauth] = useState(null);
  const [user, setuser] = useState(null);
  const [uinfo, setuinfo] = useState(null);
  const [cont, setcont] = useState(null);
  useEffect(() => {
    // setauth(new Web3AuthService());
    setuser(new UserService());
    // setuinfo(new UserInfoService());
    setcont(new ContainerService());
  }, []);

  //   const ipfs = new IpfsService();
  const [data, setData] = useState({
    userName: "",
    pass: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    const res = await user.validateUser(data.userName, data.pass);
    if (res.status === 200) {
      alert("login Success");
    } else {
      alert(res.message);
    }
  };
  return (
    <div className="form-container">
      <h3 className="logo">SOCIALIZE</h3>
      <Container component="main" maxWidth="xs">
        <div className="center">
          <form>
            <TextField
              name="userName"
              id="outlined-basic"
              label="Username"
              value={data.userName}
              onChange={handleChange}
              variant="standard"
              fullWidth
              size="medium"
              style={{ margin: "10px" }}
              autoComplete="off"
            />
            <TextField
              name="pass"
              id="outlined-basic"
              label="Password"
              value={data.pass}
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
              Login
            </Button>
            <div className="login-redirect" style={{ textAlign: "center" }}>
              Don't have an account? <Link to="/">Register here</Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
