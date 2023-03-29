export const WEB3PROVIDER = "http://127.0.0.1:8702";
export const ETH_PROVIDER = "0xADB144695f6e5e14bd4902302D5167ceaC3d11e4";
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
  USER_CREATION_CONTRACT: "0xFb313Cb21F22D2Cd66c7B5E3cD021E5c718780Bd",
  USER_MANAGEMENT_CONTRACT: "0x732fa496289655d86037f043F67883c7B6dC7c4e",
  FRIEND_REQUEST: "0x84a1ED405049176bfB7f7F21f9B97e69e2d75d35",
};

export const STATUS_MESSAGE = {
  TRANSACTION_ERROR: "Error Occured in Transaction",
  REGISTER_SUCCESS: "User Registered Successfully",
  LOGIN_SUCCESS: "User Verified",
  USER_ALREADY_EXISTS: "Username already exists!",
  USER_DOESNT_EXISTS: "Username doesn't exists!",
  INVALID_USER: "Invalid Username or Password",
};
