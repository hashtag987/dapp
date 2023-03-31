export const PostABI=  [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "post",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "timeStamp",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "userId",
        "type": "string"
      }
    ],
    "name": "createPost",
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
        "internalType": "struct PostContract.Message",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "post",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "timeStamp",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "userId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "friendId",
        "type": "string"
      }
    ],
    "name": "mapPostToFriend",
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
        "internalType": "struct PostContract.Message",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "userId",
        "type": "string"
      }
    ],
    "name": "getPosts",
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
            "name": "post",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "timeStamp",
            "type": "string"
          }
        ],
        "internalType": "struct PostContract.Post[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]