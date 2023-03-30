export const USER_INFO_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "userid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "masterPublickey",
        "type": "string"
      }
    ],
    "name": "addUserInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "int32",
            "name": "status",
            "type": "int32"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          }
        ],
        "internalType": "struct UserManagementContract.Message",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllUsers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "masterPublicKey",
            "type": "string"
          }
        ],
        "internalType": "struct UserManagementContract.User[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "name": "getUser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "masterPublicKey",
            "type": "string"
          }
        ],
        "internalType": "struct UserManagementContract.User",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "userId",
        "type": "string"
      }
    ],
    "name": "getUserById",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "masterPublicKey",
            "type": "string"
          }
        ],
        "internalType": "struct UserManagementContract.User",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
