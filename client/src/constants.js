export const WEB3PROVIDER = "http://127.0.0.1:8702";
export const ETH_PROVIDER = "0x4136AC02C02265743d839125Aa6625245f662595";
export const LOGO_TEXT="SOCIALIZE"
//api URLS
export const URL = {
  DOMAIN: "http://localhost:5000",
  CREATE_USER: "/api/auth/createuser",
  VERIFY_USER: "/api/auth/verifyuser",
  USER_EXISTS: "/api/auth/userexists",
};

//deployed contract addresses
export const CONTRACT = {
  USER_CREATION_CONTRACT: "0x8E7A96B45D2B46290F8E30D1e3F6267Ce6E26B17",
  USER_MANAGEMENT_CONTRACT: "0x1cE1aE968584f8B4E95309cd2D7b1CC11085F24B",
  FRIEND_REQUEST: "0x6D4223B3b0a4EB54da16d6AF1786eD3c3d8230EB",
};

export const STATUS_MESSAGE = {
  TRANSACTION_ERROR: "Error Occured in Transaction",
  REGISTER_SUCCESS: "User Registered Successfully",
  LOGIN_SUCCESS: "User Verified",
  USER_ALREADY_EXISTS: "Username already exists!",
  USER_DOESNT_EXISTS: "Username doesn't exists!",
  INVALID_USER: "Invalid Username or Password",
};
