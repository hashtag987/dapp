import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Icon } from "@iconify/react";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import { LOGO_COLOR, LOGO_TEXT, REUSABLE, UI } from "../../constants";
import ModalComponent from "../../utils/ModalComponent";
import { useNavigate } from "react-router-dom";
import { STATUS_MESSAGE } from "../../constants";
import { useState, useEffect } from "react";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { FriendService } from "../../services/FriendService";
import { UserInfoService } from "../../services/UserInfoService";
import FriendRecommendations from "./friends/FriendRecommendations";
import { Avatar, Tooltip } from "@mui/material";
import { v4 as uuid } from "uuid";
import SearchFriends from "./friends/SearchFriends";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: 13,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
  },
});
function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
export default function Navbar(props) {
  const navigate = useNavigate();
  const [messagealert, setmessagealert] = useState(false);
  const [message, setmessage] = useState("");
  const [severity, setseverity] = useState("success");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [friends, setfriends] = useState(null);
  const [uinfo, setuinfo] = useState(null);
  const [usage, setusage] = useState("");
  const [content, setcontent] = useState([]);
  const [requests, setrequests] = useState([]);
  const [searchContent, setsearchContent] = useState("");
  const [myFriends, setmyFriends] = useState([]);
  const [users, setusers] = useState([]);
  const [read, setread] = useState(false);
  const [notifications, setnotifications] = useState([]);
  const [profileImage, setprofileImage] = useState("");
  const [unreadnotifications, setunreadnotifications] = useState(0);
  useEffect(() => {
    setfriends(new FriendService());
    setuinfo(new UserInfoService());
  }, []);

  const getUnreadNotificationsCount = async () => {
    try {
      const count = await friends.getUnreadNotificationsCount(
        window.sessionStorage.getItem("userId")
      );
      setunreadnotifications(count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (friends != null) {
      getRequests();
      getUnreadNotificationsCount();
      getAllNotifications();
    }
  }, [friends]);

  useEffect(() => {
    if (friends != null) {
      getFriends();
    }
  }, [friends]);

  useEffect(() => {
    if (uinfo != null) {
      getProfile();
    }
  }, [uinfo]);

  const handleChange = ({ currentTarget: input }) => {
    setsearchContent(input.value);
  };

  const getNotifcationTimestamp = (notDate) => {
    const currentDate = new Date();
    const utcCurrentDate = Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const utcnotDate = Date.UTC(
      notDate.getFullYear(),
      notDate.getMonth(),
      notDate.getDate()
    );

    const daysDifference = Math.floor(
      (utcCurrentDate - utcnotDate) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference === 0) {
      return "Today, " + notDate.toLocaleTimeString();
    } else if (daysDifference === 1) {
      return "Yesterday, " + notDate.toLocaleTimeString();
    } else {
      const notDateStr = notDate.toDateString().split(" ");
      return (
        notDateStr[1] +
        " " +
        notDateStr[2] +
        "," +
        notDateStr[3] +
        ", " +
        notDate.toLocaleTimeString()
      );
    }
  };

  const getProfile = async () => {
    try {
      const image = await uinfo.getProfile(
        window.sessionStorage.getItem("userId")
      );
      setprofileImage(image);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileById = async (userId) => {
    try {
      const image = await uinfo.getProfile(userId);
      return image;
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = async (event) => {
    try {
      if (event.currentTarget.id === "requests") {
        const myRequests = await getRequests();
        setusage(REUSABLE.REQUEST);
        setcontent(myRequests);
      } else if (event.currentTarget.id === "notifications") {
        const userId = window.sessionStorage.getItem("userId");
        const password = window.sessionStorage.getItem("password");
        const myNotifications = await getAllNotifications();
        await friends.markAsReadNotification(userId, password).then(() => {
          getUnreadNotificationsCount();
        });
        setusage(REUSABLE.NOTIFICATION);
        setcontent(myNotifications);
        setread(true);
      } else {
        const myFriends = await getFriends();
        setusage(REUSABLE.FRIENDS);
        setcontent(myFriends);
      }
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = async () => {
    setOpen(false);
  };
  const isMenuOpen = Boolean(anchorEl);

  const deleteAllNotifications = async () => {
    try {
      const userId = window.sessionStorage.getItem("userId");
      const password = window.sessionStorage.getItem("password");
      await friends.deleteAllNotifications(userId, password);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllNotifications = async () => {
    try {
      let notResponse = await friends.getNotifications(
        window.sessionStorage.getItem("userId")
      );
      let notificationsJSON = [];
      for (let notification of notResponse) {
        const userInfo = await uinfo.getUserById(notification.friendId);
        notification.username = userInfo.username;
        notification.profileImage = await getProfileById(notification.friendId);
        // notification.timestamp = getNotifcationTimestamp(
        //   new Date(notification.timestamp)
        // );
        notificationsJSON.push(notification);
      }
      notificationsJSON = notificationsJSON.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setnotifications(notificationsJSON);
      return notificationsJSON;
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const getRequests = async () => {
    try {
      let reqObjects = [];
      const requests = await friends.getPendingRequests(
        window.sessionStorage.getItem("userId")
      );
      for (let request of requests) {
        const requestJSON = Object.assign({}, request);
        if (requestJSON.userid.length > 0) {
          const userInfo = await uinfo.getUserById(requestJSON.userid);
          reqObjects.push(userInfo);
        }
      }
      setrequests(reqObjects);
      return reqObjects;
    } catch (error) {
      console.log(error);
    }
  };

  const getFriends = async () => {
    try {
      let friendList = [];
      const requests = await friends.getFriends(
        window.sessionStorage.getItem("userId")
      );
      for (let friend of requests) {
        const friendJSON = Object.assign({}, friend);
        if (friendJSON.userid.length > 0) {
          const userInfo = await uinfo.getUserById(friendJSON.userid);
          userInfo.profile = await getProfileById(friendJSON.userid);
          friendList.push(userInfo);
        }
      }
      setmyFriends(friendList);
      return friendList;
    } catch (error) {
      console.log(error);
    }
  };

  const approveRequest = async (event, user) => {
    try {
      const approval = await friends
        .approveRequest(
          window.sessionStorage.getItem("userId"),
          window.sessionStorage.getItem("password"),
          user.userId
        )
        .then(() => {
          getRequests();
        });
      const userId = window.sessionStorage.getItem("userId");
      const password = window.sessionStorage.getItem("password");
      const userName = window.sessionStorage.getItem("username");
      await friends.deleteFromRequested(userId, password, user.userId);
      await friends.addFriend(userId, password, user.userId, true);
      const timeStamp = new Date().toLocaleString();
      const notId = uuid().toString();
      const message = UI.ACCEPTED_FRIEND_REQUEST;
      await friends.addToNotification(
        userId,
        password,
        user.userId,
        notId,
        "friendRequest",
        timeStamp,
        message,
        false
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeFriend = async (event, user) => {
    try {
      const userId = window.sessionStorage.getItem("userId");
      const password = window.sessionStorage.getItem("password");
      if (event.currentTarget.textContent === "Reject") {
        await friends.deleteFromRequested(userId, password, user.userId);
        const timeStamp = new Date().toLocaleString();
        const notId = uuid().toString();
        const message = UI.REJECTED_FRIEND_REQUEST;
        await friends.addToNotification(
          userId,
          password,
          user.userId,
          notId,
          "friendRequest",
          timeStamp,
          message,
          false
        );
      }
      await friends.removeFriend(userId, password, user.userId).then(() => {
        getRequests();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const undoRequest = async (user) => {
    try {
      const userId = window.sessionStorage.getItem("userId");
      const password = window.sessionStorage.getItem("password");
      await friends.undoRequest(userId, password, user.userId);
      await friends.removeFriend(userId, password, user.userId).then(() => {
        getRequests();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequest = async (user) => {
    try {
      const userId = window.sessionStorage.getItem("userId");
      const password = window.sessionStorage.getItem("password");
      await friends.addFriend(userId, password, user.userId, false);
      await friends.addToRequested(userId, password, user.userId);
      setmessagealert(true);
      setmessage("Request sent Successfully");
      setseverity("success");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    try {
      setmessagealert(true);
      setmessage(STATUS_MESSAGE.LOGOUT_SUCCESS);
      setseverity("success");
      window.sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      setmessagealert(true);
      setmessage(STATUS_MESSAGE.TRANSACTION_ERROR);
      setseverity("error");
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate(
            "/home/" + window.sessionStorage.getItem("username") + "/account"
          );
        }}
        style={{ fontSize: 13 }}
      >
        <AccountCircle
          sx={{ fontSize: 20, paddingRight: 1, color: LOGO_COLOR }}
        />
        My Account
      </MenuItem>
      <MenuItem onClick={logout} style={{ fontSize: 13 }}>
        <LogoutIcon sx={{ fontSize: 20, paddingRight: 1, color: LOGO_COLOR }} />
        Log out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className="home">
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static">
            <Toolbar id="back-to-top-anchor">
              <Typography
                variant="h6"
                className="feed-header-logo"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {LOGO_TEXT}
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon style={{ fontSize: 20, color: LOGO_COLOR }} />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={handleChange}
                  placeholder={UI.SEARCH_PLACEHOLDER}
                  inputProps={{ "aria-label": "search" }}
                />
                <SearchFriends
                  searchContent={searchContent}
                  sendRequest={sendRequest}
                  getFriends={getFriends}
                  getRequests={getRequests}
                  removeRequest={undoRequest}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Friends" arrow>
                  <IconButton
                    onClick={handleOpen}
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    id="friends"
                  >
                    <PeopleAltRoundedIcon
                      style={{ fontSize: 20, color: LOGO_COLOR }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Requests" arrow>
                  <IconButton
                    onClick={handleOpen}
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    id="requests"
                  >
                    <Badge badgeContent={requests.length} color="error">
                      <Icon
                        icon="fluent-mdl2:message-friend-request"
                        width="20"
                        height="20"
                        color={LOGO_COLOR}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notifications" arrow>
                  <IconButton
                    onClick={handleOpen}
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    id="notifications"
                  >
                    <Badge
                      badgeContent={
                        unreadnotifications > 0 ? unreadnotifications : 0
                      }
                      color="error"
                    >
                      <NotificationsIcon
                        style={{ fontSize: 20, color: LOGO_COLOR }}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <ModalComponent
                  open={open}
                  handleClose={handleClose}
                  usage={usage}
                  contents={content}
                  approveRequest={approveRequest}
                  removeFriend={removeFriend}
                  deleteAllNotifications={deleteAllNotifications}
                  getNotifcationTimestamp={getNotifcationTimestamp}
                />
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    sx={{ height: 19, width: 19, backgroundColor: LOGO_COLOR }}
                    src={profileImage}
                  ></Avatar>
                  {/* <AccountCircle style={{ fontSize: 20, color: LOGO_COLOR }}  /> */}
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        {renderMenu}
        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
      <FriendRecommendations
        getRequests={getRequests}
        getFriends={getFriends}
      />
    </div>
  );
}
