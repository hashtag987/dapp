export const WEB3PROVIDER = "http://127.0.0.1:8702";
export const ETH_PROVIDER = "0x4136AC02C02265743d839125Aa6625245f662595";

//api URLS
export const URL = {
  DOMAIN: "http://localhost:5000",
  CREATE_USER: "/api/auth/createuser",
  VERIFY_USER: "/api/auth/verifyuser",
  USER_EXISTS: "/api/auth/userexists",
};

//deployed contract addresses
export const CONTRACT = {
  USER_CREATION_CONTRACT: "0x01558eC71fD02B83EEa151a0da098fB63790C891",
};

export const STATUS_MESSAGE = {
  TRANSACTION_ERROR: "Error Occured in Transaction",
  REGISTER_SUCCESS: "User Registered Successfully",
  LOGIN_SUCCESS: "User Verified",
  USER_ALREADY_EXISTS: "Username already exists!",
  USER_DOESNT_EXISTS: "Username doesn't exists!",
  INVALID_USER: "Invalid Username or Password",
};
