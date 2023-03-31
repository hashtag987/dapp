export const WEB3PROVIDER = "http://127.0.0.1:8702";
export const ETH_PROVIDER = "0x91BfC309Bb6e44D605A56eC88d4373B268FeBc12";
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
};

//deployed contract addresses
export const CONTRACT = {
  USER_CREATION_CONTRACT: "0xeEc2B64a38D664a4D1eDcE47ddD9d231C82EcDFa",
  USER_MANAGEMENT_CONTRACT: "0x4C8513b9aab5fd2AD0FCC4EB4De72d18EC5be84E",
  FRIEND_REQUEST: "0xadFb6F70d0824dc0437112e004791501f8316A3F",
  POST_CONTRACT: "0x17bE73DFE83156e4dCeb75d9088C7A05D131a380",
};

export const STATUS_MESSAGE = {
  TRANSACTION_ERROR: "Error Occured in Transaction",
  REGISTER_SUCCESS: "User Registered Successfully",
  LOGIN_SUCCESS: "User Verified",
  LOGOUT_SUCCESS: "User Logged out",
  USER_ALREADY_EXISTS: "Username already exists!",
  USER_DOESNT_EXISTS: "Username doesn't exists!",
  INVALID_USER: "Invalid Username or Password",
  EMPTY_NOTIFICATIONS: "Currently there no notifications for you🙂",
  EMPTY_FRIENDS: "Looks like you're alone😔",
  EMPTY_POSTS: "Enna onnum kaanom🤨?",
};

export const REUSABLE = {
  NOTIFICATION: 1000,
  FRIENDS: 1001,
};
