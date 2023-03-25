const UserManagement = artifacts.require("./UserManagement.sol");

contract("UserManagement", (accounts) => {
  it("...should store the value 'Hello Blockchain'.", async () => {
    const UserManagementInstance = await UserManagement.deployed();

    // Set value of Hello World
    // await UserManagementInstance.getUser("arun123","adm111", { from: "0xbbD718B23AA16AC53A40F33C723455389659Ca2C"  });

    // Get stored value
    const create_user = await UserManagementInstance.createUser(
      "name",
      "username",
      "email",
      "pass",
      "pass",
      "sdsad",
      "asdsadd"
    ).send({from:"0xbbd718b23aa16ac53a40f33c723455389659ca2c"});
    console.log(create_user)
    const storedData = await UserManagementInstance.userExists("name");
    console.log(storedData);
    // assert.equal(storedData, "Hello Blockchain", "The value 'Hello Blockchain' was not stored.");
  });
});
