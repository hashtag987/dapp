const UserManagementContract = artifacts.require("UserManagementContract");

module.exports = function (deployer) {
  deployer.deploy(UserManagementContract);
};