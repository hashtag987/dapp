export const WEB3PROVIDER = "http://127.0.0.1:8702";
export const ETH_PROVIDER = "0x4136AC02C02265743d839125Aa6625245f662595";
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
  USER_CREATION_CONTRACT: "0x28d3F92cdEFa79bC193d905C598E244504E66Ea4",
  USER_MANAGEMENT_CONTRACT: "0x1759B0aeAe70d333EFE8009b7FCc7F5f3dB224B1",
  FRIEND_REQUEST: "0xb47714CeB389851cCE1034a835A699d58ce166eC",
};

export const STATUS_MESSAGE = {
  TRANSACTION_ERROR: "Error Occured in Transaction",
  REGISTER_SUCCESS: "User Registered Successfully",
  LOGIN_SUCCESS: "User Verified",
  LOGOUT_SUCCESS: "User Logged out",
  USER_ALREADY_EXISTS: "Username already exists!",
  USER_DOESNT_EXISTS: "Username doesn't exists!",
  INVALID_USER: "Invalid Username or Password",
  EMPTY_NOTIFICATIONS:"Currently there no notifications for you🙂",
  EMPTY_FRIENDS:"Looks like you're alone😔"
};

export const REUSABLE = {
  NOTIFICATION: 1000,
  FRIENDS: 1001,
};