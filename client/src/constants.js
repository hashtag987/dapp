export const WEB3PROVIDER = "http://127.0.0.1:8702";
export const ETH_PROVIDER = "0xADB144695f6e5e14bd4902302D5167ceaC3d11e4";
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
  USER_CREATION_CONTRACT: "0x7A551dB096f274C4049FEcB72Bd57a1Cf382fDD5",
  USER_MANAGEMENT_CONTRACT: "0xD0871FDdDb06191bc549Afe9424ac866b9D4CdD1",
  FRIEND_REQUEST: "0x1a0Be5a16980b1d9FB15c3c08f264A059104e0ec",
  POST_CONTRACT: "0x7651949dC869100aE577D02972849e5c9ffE8e33",
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

export const UI={
  REGISTER_HOME_TEXT:"Hello there...",
  LOGIN_HOME_TEXT:"Welcome Back",
  RECOMMENDATIONS_HEADER:"Recommended for you",
  SEARCH_PLACEHOLDER:"Find Friends",
}
export const REUSABLE = {
  NOTIFICATION: 1000,
  FRIENDS: 1001,
};
