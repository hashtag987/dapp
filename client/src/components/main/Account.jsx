// import React, { useState, useEffect } from "react";
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    maxWidth: 600,
    margin: 'auto',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(3, 0),
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Avatar className={classes.avatar} />
      <Typography variant="h4" align="center" gutterBottom>
        example_user
      </Typography>
      <form className={classes.form}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          className={classes.textField}
          defaultValue="example_user"
        />
        <FormControl variant="outlined" fullWidth className={classes.textField}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            defaultValue="********"
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <VisibilityOff />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth className={classes.textField}>
          <InputLabel htmlFor="newPassword">New Password</InputLabel>
          <Input
            id="newPassword"
            type="password"
            defaultValue=""
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <VisibilityOff />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={110}
          />
        </FormControl>
        <TextField
          label="Contact Us"
          variant="outlined"
          fullWidth
          className={classes.textField}
          defaultValue=""
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" className={classes.button}>
          Change Password
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Change Username
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Contact Us
        </Button>
      </form>
    </Container>
  );
};

export default Account;

