export const WEB3PROVIDER = "http://127.0.0.1:8703";
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
  USER_CREATION_CONTRACT: "0x05Cf09A1D14301107629D13Cc35069b97799cA2B",
  USER_MANAGEMENT_CONTRACT: "0x9EA000Ac977c25595656B2976cFd2CC67801DBA8",
  FRIEND_REQUEST: "0x8b331156dD1CcEc9Ec414956970A0e25b82D74Ff",
  POST_CONTRACT: "0xc1cFB2Ec25c45D25Baa14ee05F2fB5652a9A2297",
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
  EMPTY_POSTS: "No posts Found❕",
  EMPTY_POST_CONTENT: "Post content cannot be empty",
  EMPTY_USERS: "No users found",
};

export const UI = {
  REGISTER_HOME_TEXT: "Hello there...",
  LOGIN_HOME_TEXT: "Welcome Back",
  RECOMMENDATIONS_HEADER: "Recommended for you",
  SEARCH_PLACEHOLDER: "Find Friends",
};
export const REUSABLE = {
  NOTIFICATION: 1000,
  FRIENDS: 1001,
};
