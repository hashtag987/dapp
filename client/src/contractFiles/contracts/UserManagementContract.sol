// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagementContract {
    struct User {
        string userId;
        string name;
        string username;
        string profileImage;
        string masterPublicKey;
    }

    struct Message {
        int32 status;
        string message;
    }
    string[] private addressLUT;
    mapping(string => User) private addressToUser;

    function addUserInfo(
        string memory userid,
        string memory name,
        string memory username,
        string memory profileImage,
        string memory masterPublickey
    ) public returns (Message memory) {
        User memory user = User(
            userid,
            name,
            username,
            profileImage,
            masterPublickey
        );
        addressToUser[userid] = user;
        addressLUT.push(userid);
        Message memory message = Message(200, "Success");
        return message;
    }

    function getAllUsers() public view returns (User[] memory) {
        User[] memory users = new User[](addressLUT.length);
        for (uint i = 0; i < addressLUT.length; i++) {
            users[i] = addressToUser[addressLUT[i]];
        }
        return users;
    }

    function getRecommendations(
        string[] memory friendsOrRequests
    ) public view returns (User[] memory) {
        User[] memory users = new User[](addressLUT.length);
        for (uint i = 0; i < addressLUT.length; i++) {
            if (!contains(friendsOrRequests, addressLUT[i])) {
                users[i] = addressToUser[addressLUT[i]];
            }
        }
        return users;
    }

    function contains(
        string[] memory array,
        string memory user
    ) internal pure returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if (keccak256(bytes(user)) == keccak256(bytes(array[i]))) {
                return true;
            }
        }
        return false;
    }

    function getUser(string memory username) public view returns (User memory) {
        for (uint i = 0; i < addressLUT.length; i++) {
            if (
                keccak256(bytes(addressToUser[addressLUT[i]].username)) ==
                keccak256(bytes(username))
            ) {
                return addressToUser[addressLUT[i]];
            }
        }
        return addressToUser["abc"];
    }

    function changeProfile(
        string memory userId,
        string memory profileImage
    ) public {
        User storage user = addressToUser[userId];
        user.profileImage = profileImage;
    }

    function getProfile(
        string memory userId
    ) public view returns (string memory) {
        return addressToUser[userId].profileImage;
    }

    function getUserById(
        string memory userId
    ) public view returns (User memory) {
        return addressToUser[userId];
    }
}
