// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagementContract {
    struct User {
        string name;
        string username;
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
        string memory masterPublickey
    ) public returns (Message memory) {
        User memory user = User(name, username, masterPublickey);
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

    function getUser(string memory userid) public view returns(User memory){
        return addressToUser[userid];
    }
}
