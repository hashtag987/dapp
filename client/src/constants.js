export const WEB3PROVIDER = "http://127.0.0.1:8701";
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
  USER_CREATION_CONTRACT: "0xEB583273283A907859604858aAC3b5646192aB3F",
  USER_MANAGEMENT_CONTRACT: "0xCB8E5547DB7D4325026fb42984Eb10EfA6e0b087",
  FRIEND_REQUEST: "0x800dECa8f7c7E7D0901df1DafE8f36Ea4F34c980",
  POST_CONTRACT: "0x640414A505a88414Da01Fa5840e7fA64c8FF0Ba6",
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
