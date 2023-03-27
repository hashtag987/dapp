export const userABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "userHash",
        type: "string",
      },
    ],
    name: "Signed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    name: "UserCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "UserDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "UserUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    name: "userExists",
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
        internalType: "struct UserCreationContract.Message",
        name: "",
        type: "tuple",
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
        name: "username",
        type: "string",
      },
    ],
    name: "getUser",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "string",
            name: "password",
            type: "string",
          },
          {
            internalType: "string",
            name: "masterPublicKey",
            type: "string",
          },
          {
            internalType: "string",
            name: "userToken",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isLoggedIn",
            type: "bool",
          },
        ],
        internalType: "struct UserCreationContract.User",
        name: "",
        type: "tuple",
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
        name: "username",
        type: "string",
      },
    ],
    name: "getSignature",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "userHash",
            type: "string",
          },
          {
            internalType: "string",
            name: "masterPublicKey",
            type: "string",
          },
          {
            internalType: "string",
            name: "signature",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isValid",
            type: "bool",
          },
        ],
        internalType: "struct UserCreationContract.Signature",
        name: "",
        type: "tuple",
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
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "password",
        type: "string",
      },
      {
        internalType: "string",
        name: "masterPublicKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "userToken",
        type: "string",
      },
    ],
    name: "createUser",
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
        internalType: "struct UserCreationContract.Message",
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
        name: "userHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "masterPublicKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
    ],
    name: "addToSignature",
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
        internalType: "struct UserCreationContract.Message",
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
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "password",
        type: "string",
      },
    ],
    name: "validateUser",
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
        internalType: "struct UserCreationContract.Message",
        name: "",
        type: "tuple",
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
        name: "password",
        type: "string",
      },
    ],
    name: "deleteUser",
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
        internalType: "struct UserCreationContract.Message",
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
        name: "password",
        type: "string",
      },
    ],
    name: "changePass",
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
        internalType: "struct UserCreationContract.Message",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
