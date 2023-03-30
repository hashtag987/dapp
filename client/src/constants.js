export const WEB3PROVIDER = "http://127.0.0.1:8702";
export const ETH_PROVIDER = "0xADB144695f6e5e14bd4902302D5167ceaC3d11e4";
export const LOGO_TEXT="SOCIALIZE"
//api URLS
export const URL = {
  DOMAIN: "http://localhost:5000",
  CREATE_USER: "/api/auth/createuser",
  VERIFY_USER: "/api/auth/verifyuser",
  USER_EXISTS: "/api/auth/userexists",
  ENCRYPT_PASSWORD: "/api/auth/encryptPassword",
};

//deployed contract addresses
export const CONTRACT = {
  USER_CREATION_CONTRACT: "0x53c19c5e478436C77AF2975de5558B520ea893D2",
  USER_MANAGEMENT_CONTRACT: "0xbDaC462851B910c6F224ABd48b7d57bBD3Eec13F",
  FRIEND_REQUEST: "0xF9136D618F53DC675F227bFAD621FE8b72E10380",
};

export const STATUS_MESSAGE = {
  TRANSACTION_ERROR: "Error Occured in Transaction",
  REGISTER_SUCCESS: "User Registered Successfully",
  LOGIN_SUCCESS: "User Verified",
  LOGOUT_SUCCESS: "User Logged out",
  USER_ALREADY_EXISTS: "Username already exists!",
  USER_DOESNT_EXISTS: "Username doesn't exists!",
  INVALID_USER: "Invalid Username or Password",
};

export const REUSABLE = {
  NOTIFICATION: 1000,
  FRIENDS: 1001,
};