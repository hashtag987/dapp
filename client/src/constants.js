export const WEB3PROVIDER = "http://127.0.0.1:8701";
export const ETH_PROVIDER = "0x4136AC02C02265743d839125Aa6625245f662595";
export const LOGO_TEXT = "SOCIALIZE";
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
  USER_CREATION_CONTRACT: "0x70661592639bC91D5c9C25f8BC9E45b714C6b982",
  USER_MANAGEMENT_CONTRACT: "0xc13924DA396fe6eC78A80a676d4413A02c90062A",
  FRIEND_REQUEST: "0xA1588715616Ec7135A30D87eD3e287d4eea795eF",
  POST_CONTRACT: "0xB994b590553D74585825505Dbd35C151a60e28d6",
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

export const REUSABLE = {
  NOTIFICATION: 1000,
  FRIENDS: 1001,
};
