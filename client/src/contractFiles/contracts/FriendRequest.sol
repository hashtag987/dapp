// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FriendRequest {
    struct Message {
        int32 status;
        string message;
    }

    struct Friend {
        string userid;
        uint8 status;
    }

    mapping(string => Friend[]) private userToFriend;
    mapping(string => string[]) private requesterToRequested;
    string[] private addressLUT;

    function addFriend(
        string memory userId,
        string memory friendId,
        bool isApproved
    ) public returns (Message memory) {
        Friend memory friend = Friend(userId, (isApproved) ? 1 : 2);
        Message memory message;
        userToFriend[friendId].push(friend);
        message = Message(200, "Friend Added!");
        return message;
    }

    function addToRequested(
        string memory userId,
        string memory friendId
    ) public returns (Message memory) {
        requesterToRequested[userId].push(friendId);
        return Message(200, "Friend Request have been sent");
    }

    function deleteFromRequested(
        string memory userId,
        string memory friendId
    ) public returns (Message memory) {
        for (uint i = 0; i < requesterToRequested[userId].length; i++) {
            if (
                keccak256(bytes(requesterToRequested[userId][i])) ==
                keccak256(bytes(friendId))
            ) {
                delete requesterToRequested[userId][i];
                return Message(200, "Request removed successfully!");
            }
        }
        return Message(500, "Internal server error!");
    }

    function getRequested(
        string memory userId
    ) public view returns (string[] memory) {
        return requesterToRequested[userId];
    }

    function approveRequest(
        string memory userId,
        string memory friendId
    ) public {
        for (uint i = 0; i < userToFriend[userId].length; i++) {
            if (
                keccak256(bytes(userToFriend[userId][i].userid)) ==
                keccak256(bytes(friendId))
            ) {
                Friend storage change = userToFriend[userId][i];
                change.status = 1;
            }
        }
    }

    function addUserId(string memory userId) public {
        addressLUT.push(userId);
    }

    function getFriends(
        string memory userId
    ) public view returns (Friend[] memory) {
        Friend[] memory friend = new Friend[](addressLUT.length);
        uint256 index = 0;
        for (uint j = 0; j < userToFriend[userId].length; j++) {
            if (userToFriend[userId][j].status == 1) {
                friend[index++] = userToFriend[userId][j];
            }
        }
        return friend;
    }

    function getPendingRequests(
        string memory userId
    ) public view returns (Friend[] memory) {
        Friend[] memory friend = new Friend[](addressLUT.length);
        uint256 index = 0;
        for (uint j = 0; j < userToFriend[userId].length; j++) {
            if (userToFriend[userId][j].status == 2) {
                friend[index++] = userToFriend[userId][j];
            }
        }
        return friend;
    }

    function removeFriend(
        string memory user,
        string memory friend
    ) public returns (Message memory) {
        for (uint i = 0; i < userToFriend[user].length; i++) {
            if (
                keccak256(bytes(userToFriend[user][i].userid)) ==
                keccak256(bytes(friend))
            ) {
                delete userToFriend[user][i];
                return Message(200, "Friend removed successfully!");
            }
        }
        return Message(500, "Internal server error!");
    }
}
