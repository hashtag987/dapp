//import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@material-ui/core';

const Account = () => {
  const classes = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: theme.spacing(4),
    },
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(2),
    },
    // field: {
    //   margin: theme.spacing(2),
    //   width: '100%',
    // },
    // switchContainer: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   width: '100%',
    //   margin: theme.spacing(2),
    // },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      margin: theme.spacing(2),
    },
  }));
  //const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Avatar
            alt="User profile picture"
            //src="/path/to/profile-picture.png"
            className={classes.avatar}
          />
          <Typography variant="h5" component="h2" align="center">
            John Doe
          </Typography>
          <Divider variant="middle" />
          <form className={classes.form}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              className={classes.field}
              defaultValue="John Doe"
            />
            {/* <TextField
              id="bio"
              label="Bio"
              variant="outlined"
              multiline
              rows={4}
              className={classes.field}
              defaultValue="I love exploring the world and meeting new people!"
            />
            <TextField
              id="interests"
              label="Interests"
              variant="outlined"
              className={classes.field}
              defaultValue="Travel, photography, music"
            />
            <div className={classes.switchContainer}>
              <Typography variant="subtitle1">
                Private Account
              </Typography>
              <FormControlLabel
                control={<Switch color="primary" />}
                label=""
              />
            </div> */}
            <div className={classes.buttonContainer}>
              <Button variant="outlined" color="primary">
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary">
                Delete Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
