export const WEB3PROVIDER = "http://127.0.0.1:8701";
export const ETH_PROVIDER = "0x4136AC02C02265743d839125Aa6625245f662595";
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
  USER_CREATION_CONTRACT: "0xDAe61C701Da8E79Ba791610Bd2d6834C3972fdaf",
  USER_MANAGEMENT_CONTRACT: "0xC9B36935A35bf89E0599836B401EB99E253B9072",
  FRIEND_REQUEST: "0xE805856243BCf2F6C7eCD9043aB90be21390F665",
  POST_CONTRACT: "0x0655e2512A7082eeFB06857Ed6321DdaA09d7B92",
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
