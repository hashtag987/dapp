export const WEB3PROVIDER = "http://127.0.0.1:8702";
export const ETH_PROVIDER = "0xA2551bC8D5F2D252DfEF20AB5ED494ebDfFa96C1";
export const LOGO_TEXT = "SOCIALIZE";
export const LOGO_COLOR = "#4a79f1";
//api URLS
export const URL = {
  DOMAIN: "http://localhost:5000",
  CREATE_USER: "/api/auth/createuser",
  VERIFY_USER: "/api/auth/verifyuser",
  USER_EXISTS: "/api/auth/userexists",
  ENCRYPT_PASSWORD: "/api/auth/encryptPassword",
  ENCRYPT_POST: "/api/ops/encryptPost",
  DECRYPT_POST: "/api/ops/decryptPost",
  TOKEN_BUFFER: "/api/auth/tokenbuffer",
};

//deployed contract addresses
export const CONTRACT = {
  USER_CREATION_CONTRACT: "0x5EA83Cb6CB55edAE27fb360567BF0A8e6096934F",
  USER_MANAGEMENT_CONTRACT: "0x11906b6cd7b7f8DAd384dA95284D7Ad8349481B4",
  FRIEND_REQUEST: "0x9bE03CaC4D8a9D4fba02B17D2152F711e582A9c2",
  POST_CONTRACT: "0x3Cd5a2fBa61917Edcf13AaBD99E7608BAb249091",
};

export const STATUS_MESSAGE = {
  TRANSACTION_ERROR: "Error Occured in Transaction",
  REGISTER_SUCCESS: "User Registered Successfully",
  LOGIN_SUCCESS: "User Verified",
  LOGOUT_SUCCESS: "User Logged out",
  USER_ALREADY_EXISTS: "Username already exists!",
  USER_DOESNT_EXISTS: "Username doesn't exists!",
  INVALID_USER: "Invalid Username or Password",
  EMPTY_NOTIFICATIONS: "Currently there no notifications for you",
  EMPTY_FRIENDS: "Looks like you're alone. Add some friends",
  EMPTY_REQUESTS: "No friend Requests",
  EMPTY_POSTS: "No posts Found❕",
  EMPTY_POST_CONTENT: "Post content cannot be empty",
  EMPTY_USERS: "No users found",
};

export const UI = {
  REGISTER_HOME_TEXT: "Hello there...",
  LOGIN_HOME_TEXT: "Welcome Back",
  RECOMMENDATIONS_HEADER: "Recommended for you",
  SEARCH_PLACEHOLDER: "Find Friends",
  SEARCH_FRIENDS_PLACEHOLDER: "Search Friends",
  ACCEPTED_FRIEND_REQUEST: " has accepted your friend request",
  REJECTED_FRIEND_REQUEST: " has rejected your friend request",
  REMOVED_FROM_FRIENDS: " has removed you from their friend list",
};
export const REUSABLE = {
  NOTIFICATION: 1000,
  FRIENDS: 1001,
  REQUEST: 1002,
};
