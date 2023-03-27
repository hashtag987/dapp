const FriendRequest = artifacts.require("FriendRequest");

module.exports = function (deployer) {
  deployer.deploy(FriendRequest);
};