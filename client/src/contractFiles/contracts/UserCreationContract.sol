// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserCreationContract {
    struct User {
        string username;
        string password;
        string masterPublicKey;
        string userToken;
        string trace;
        bool isLoggedIn;
    }

    struct Message {
        int32 status;
        string message;
    }

    struct Signature {
        string userHash;
        string masterPublicKey;
        string signature;
        bool isValid;
    }

    mapping(address => User) private addressToUser;
    mapping(string => address) private usernameToAddress;
    mapping(string => Signature) private userHashToSignature;

    event UserCreated(address indexed userAddress, string username);
    event Signed(string userHash);
    event UserUpdated(address indexed userAddress);
    event UserDeleted(address indexed userAddress);

    function userExists(
        string memory username
    ) public view returns (Message memory) {
        Message memory message;
        if (userHashToSignature[username].isValid) {
            message = Message(200, "User already Exists");
            return message;
        }
        message = Message(404, "User Not Found");
        return message;
    }

    // function getUser(string memory username) public view returns(User memory){
    //     address userAddress = usernameToAddress[username];
    //     User memory user = addressToUser[userAddress];
    //     return user;
    // }

    function getUser() public view returns (User memory) {
        return addressToUser[msg.sender];
    }

    function getSignature(
        string memory username
    ) public view returns (Signature memory) {
        return userHashToSignature[username];
    }

    function createUser(
        string memory username,
        string memory password,
        string memory masterPublicKey,
        string memory userToken,
        string memory trace
    ) public returns (Message memory) {
        User memory user = User(
            username,
            password,
            masterPublicKey,
            userToken,
            trace,
            false
        );
        addressToUser[msg.sender] = user;
        usernameToAddress[username] = msg.sender;
        emit UserCreated(msg.sender, username);
        Message memory message = Message(200, "User created successfully");
        return message;
    }

    function addToSignature(
        string memory userHash,
        string memory masterPublicKey,
        string memory signature
    ) public returns (Message memory) {
        Signature memory sign = Signature(
            userHash,
            masterPublicKey,
            signature,
            true
        );
        userHashToSignature[userHash] = sign;
        Message memory message = Message(200, "Signature added successfully");
        emit Signed(userHash);
        return message;
    }

    function validateUser(
        string memory username,
        string memory password
    ) public view returns (Message memory) {
        address userAddress = usernameToAddress[username];
        User memory user = addressToUser[userAddress];
        Message memory message;
        if (keccak256(bytes(user.password)) != keccak256(bytes(password))) {
            message = Message(500, "Invalid password for the User");
            return message;
        }
        message = Message(200, "User is valid");
        return message;
    }

    function deleteUser(
        string memory password
    ) public returns (Message memory) {
        address userAddress = msg.sender;
        User memory user = addressToUser[userAddress];
        Message memory message;
        if (keccak256(bytes(user.password)) != keccak256(bytes(password))) {
            message = Message(500, "Invalid password for the User");
            return message;
        }
        delete addressToUser[userAddress];
        delete usernameToAddress[user.username];
        message = Message(200, "User deleted Succuessfully");
        emit UserDeleted(msg.sender);
        return message;
    }

    function changePass(
        string memory password
    ) public returns (Message memory) {
        address userAddress = msg.sender;
        User memory user = addressToUser[userAddress];
        Message memory message;
        if (keccak256(bytes(user.password)) == keccak256(bytes(password))) {
            message = Message(
                500,
                "New password cannot be same as Old password"
            );
            return message;
        }
        User storage changeUser = addressToUser[userAddress];
        changeUser.password = password;
        message = Message(200, "Password changed Succuessfully");
        emit UserUpdated(msg.sender);
        return message;
    }
}
