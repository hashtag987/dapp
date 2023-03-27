// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FriendRequest {
    struct Message {
        int32 status;
        string message;
    }

    struct Friends{
        string userid;
        string status;
    }

    mapping(string => string[]) private userToFriend;

    //event friendAdded(address indexed userAddress, address indexed friendAddress);

    function addFriend(
        string memory userId,
        string memory friendId
    ) public returns (Message memory) {
        Message memory message;
        userToFriend[userId].push(friendId);
        message = Message(200, "Friend Added!");
        return message;
    }

    function getFriends(
        string memory userId
    ) public view returns (string[] memory) {
        return userToFriend[userId];
    }

    function removeFriend(
        string memory user,
        string memory friend
    ) public returns (Message memory) {
        Message memory message;
        uint256 index = findIndex(userToFriend[user], friend);
        for (uint i = index; i < userToFriend[user].length - 1; i++) {
            userToFriend[user][i] = userToFriend[user][i + 1];
        }

        delete userToFriend[user][userToFriend[user].length - 1];
        userToFriend[user].pop();

        message = Message(200, "Friend removed!");
        return message;
    }

    function findIndex(
        string[] memory arr,
        string memory userId
    ) internal pure returns (uint256) {
        for (uint256 i = 0; i < arr.length; i++) {
            if (keccak256(bytes(arr[i])) == keccak256(bytes(userId))) {
                return i;
            }
        }
        return arr.length;
    }
}
