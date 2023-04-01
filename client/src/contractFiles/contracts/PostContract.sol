// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PostContract {
    struct Post {
        string userId;
        string post;
        string timeStamp;
        bool hasImage;
        string imageHash;
    }

    struct Message {
        int32 status;
        string message;
    }

    mapping(string => Post[]) private addressToPost;

    //event PostCreated(address indexed postAddress, int postId);

    function createPost(
        string memory post,
        string memory timeStamp,
        string memory userId,
        bool hasImage,
        string memory imageHash
    ) public returns (Message memory) {
        Post memory currentPost = Post(
            userId,
            post,
            timeStamp,
            hasImage,
            imageHash
        );
        addressToPost[userId].push(currentPost);
        //emit PostCreated(msg.sender, postId);
        Message memory message = Message(200, "Post created successfully");
        return message;
    }

    function mapPostToFriend(
        string memory post,
        string memory timeStamp,
        string memory userId,
        string memory friendId,
        bool hasImage,
        string memory imageHash
    ) public returns (Message memory) {
        Post memory currentPost = Post(
            userId,
            post,
            timeStamp,
            hasImage,
            imageHash
        );
        addressToPost[friendId].push(currentPost);
        //emit PostCreated(msg.sender, postId);
        Message memory message = Message(200, "Post created successfully");
        return message;
    }

    function getPosts(
        string memory userId
    ) public view returns (Post[] memory) {
        return addressToPost[userId];
    }
}
