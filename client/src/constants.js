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
  USER_CREATION_CONTRACT: "0xdB4e17E58BDD387197160E8F3411B860680Aef0c",
  USER_MANAGEMENT_CONTRACT: "0xD26188f286cfa5dF1f7B4cA65971677187E6c2e8",
  FRIEND_REQUEST: "0x2eEA5198E5Bed0af981AaB9552e4c485F890BcdB",
};

export const STATUS_MESSAGE = {
  TRANSACTION_ERROR: "Error Occured in Transaction",
  REGISTER_SUCCESS: "User Registered Successfully",
  LOGIN_SUCCESS: "User Verified",
  USER_ALREADY_EXISTS: "Username already exists!",
  USER_DOESNT_EXISTS: "Username doesn't exists!",
  INVALID_USER: "Invalid Username or Password",
};
