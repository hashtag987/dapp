export const FriendRequestABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "friendId",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isApproved",
        type: "bool",
      },
    ],
    name: "addFriend",
    outputs: [
      {
        components: [
          {
            internalType: "int32",
            name: "status",
            type: "int32",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
        ],
        internalType: "struct FriendRequest.Message",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "friendId",
        type: "string",
      },
    ],
    name: "addToRequested",
    outputs: [
      {
        components: [
          {
            internalType: "int32",
            name: "status",
            type: "int32",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
        ],
        internalType: "struct FriendRequest.Message",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "friendId",
        type: "string",
      },
    ],
    name: "deleteFromRequested",
    outputs: [
      {
        components: [
          {
            internalType: "int32",
            name: "status",
            type: "int32",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
        ],
        internalType: "struct FriendRequest.Message",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "getRequested",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "friendId",
        type: "string",
      },
    ],
    name: "approveRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "addUserId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "getFriends",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "userid",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct FriendRequest.Friend[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "getPendingRequests",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "userid",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct FriendRequest.Friend[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "user",
        type: "string",
      },
      {
        internalType: "string",
        name: "friend",
        type: "string",
      },
    ],
    name: "removeFriend",
    outputs: [
      {
        components: [
          {
            internalType: "int32",
            name: "status",
            type: "int32",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
        ],
        internalType: "struct FriendRequest.Message",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "notId",
        type: "string",
      },
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "friendId",
        type: "string",
      },
      {
        internalType: "string",
        name: "timestamp",
        type: "string",
      },
      {
        internalType: "string",
        name: "notType",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isRead",
        type: "bool",
      },
    ],
    name: "addToNotification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "getNotifications",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "notId",
            type: "string",
          },
          {
            internalType: "string",
            name: "friendId",
            type: "string",
          },
          {
            internalType: "string",
            name: "timestamp",
            type: "string",
          },
          {
            internalType: "string",
            name: "notType",
            type: "string",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isRead",
            type: "bool",
          },
        ],
        internalType: "struct FriendRequest.Notification[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "getUnreadNotificationsCount",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "markAsReadNotification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "deleteAllNotifications",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "notId",
        type: "string",
      },
    ],
    name: "deleteNotification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
