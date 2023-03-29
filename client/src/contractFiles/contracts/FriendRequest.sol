// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FriendRequest {
    struct Message {
        int32 status;
        string message;
    }

    struct Friend{
        string userid;
        uint8 status;
    }

    mapping(string => Friend[]) private userToFriend;
    string[] private addressLUT;
    //event friendAdded(address indexed userAddress, address indexed friendAddress);

    function addFriend(
        string memory userId,
        string memory friendId,
        bool isApproved
    ) public returns (Message memory) {
        Friend memory friend=Friend(userId,(isApproved)? 1:2);
        Message memory message;
        userToFriend[friendId].push(friend);
        message = Message(200, "Friend Added!");
        return message;
    }

    function changeStatus(
        string memory userId,
        string memory friendId
    ) public {
        for(uint i=0;i<userToFriend[userId].length;i++) {
            if(keccak256(bytes(userToFriend[userId][i].userid)) == keccak256(bytes(friendId))) {
                Friend storage change=userToFriend[userId][i];
                change.status=(change.status==1)? 2:1;
            }
        }
    }

    function addUserId(
        string memory userId
    ) public {
        addressLUT.push(userId);
    }

    function getFriends(
        string memory userId
    ) public view returns (Friend[] memory) {
        return userToFriend[userId];
    }

    function getPendingRequests(
        string memory userId
    ) public view returns (Friend[] memory) {
        Friend[] memory friend=new Friend[](addressLUT.length);
        uint256 index=0;
        for(uint j=0;j<userToFriend[userId].length;j++) {
            if(userToFriend[userId][j].status==2) {
                friend[index++]=userToFriend[userId][j];
            }
        }
        return friend;
    }

    // function removeFriend(
    //     string memory user,
    //     string memory friend
    // ) public returns (Message memory) {
    //     Message memory message;
    //     uint256 index = findIndex(userToFriend[user], friend);
    //     for (uint i = index; i < userToFriend[user].length - 1; i++) {
    //         userToFriend[user][i] = userToFriend[user][i + 1];
    //     }

    //     delete userToFriend[user][userToFriend[user].length - 1];
    //     userToFriend[user].pop();

    //     message = Message(200, "Friend removed!");
    //     return message;
    // }

    // function findIndex(
    //     string[] memory arr,
    //     string memory userId
    // ) internal pure returns (uint256) {
    //     for (uint256 i = 0; i < arr.length; i++) {
    //         if (keccak256(bytes(arr[i])) == keccak256(bytes(userId))) {
    //             return i;
    //         }
    //     }
    //     return arr.length;
    // }
}
