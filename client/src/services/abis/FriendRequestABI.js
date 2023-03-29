export const FriendRequestABI = [
    {
        "inputs": [
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
        "name": "addFriend",
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
                "internalType": "struct FriendRequest.Message",
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
        "name": "getFriends",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
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
                "name": "user",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "friend",
                "type": "string"
            }
        ],
        "name": "removeFriend",
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
                "internalType": "struct FriendRequest.Message",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]