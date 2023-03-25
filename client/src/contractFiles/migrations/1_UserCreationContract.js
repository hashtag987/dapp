const UserCreationContract = artifacts.require("UserCreationContract");

module.exports = function (deployer) {
  deployer.deploy(UserCreationContract);
};