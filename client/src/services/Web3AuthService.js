import React from "react";
import Web3 from "web3";
import { ContainerService } from "./ContainerService";
export class Web3AuthService extends React.Component {
  props = {
    // contractDeployedAt: "0x42a6e27Ee9fA4CEdD9779B667D2f2C4652cC47d3",
    auth: null,
    accounts: [],
    web3: Web3,
    cont: new ContainerService(),
  };
  constructor() {
    super();
    console.log("Web3AuthService Initialized...");
    this.createWeb3();
  }

  register = async (userName, id, name, pass, que, ans) => {
    // it calls getOrganizer method of exhibition contract
    console.log("Before --", id, "-", this.props.cont.getId());
    await this.props.web3.eth.personal.unlockAccount(
      this.props.cont.getId(),
      this.props.cont.getPass(),
      120
    );
    console.log("id - ", this.props.cont.getId());
    console.log("pass - ", this.props.cont.getPass());
    await this.props.auth.methods
      .regiter(userName, id, name, pass, que, ans)
      .send({ from: this.props.cont.getId() }, function (error, result) {
        if (error) console.log("Error occured :", error);
        else console.log("Result: ", result);
      });
    console.log("After --");
  };

  authenticate = async (userName, pass) => {
    // return address of user account
    return await this.props.auth.methods
      .authenticate(userName, pass)
      .call({ from: this.props.cont.getId() });
  };

  delAuth = async (id, userName) => {
    await this.props.web3.eth.personal.unlockAccount(
      this.props.cont.getId(),
      this.props.cont.getPass(),
      60
    );
    await this.props.auth.methods
      .delAuth(id, userName)
      .send({ from: this.props.cont.getId() });
  };

  changepass = async (id, userName, pass) => {
    // it calls getOrganizer method of exhibition contract
    console.log("ID -", this.props.cont.getId());
    console.log("Pass -", this.props.cont.getPass());
    await this.props.web3.eth.personal.unlockAccount(
      this.props.cont.getId(),
      this.props.cont.getPass(),
      60
    );
    await this.props.auth.methods
      .changePass(id, userName, pass)
      .send({ from: this.props.cont.getId() });
  };

  forgetpass = async (userName, que, ans) => {
    // it calls getOrganizer method of exhibition contract
    return await this.props.auth.methods
      .forgrtPass(userName, que, ans)
      .call({ from: this.props.cont.getId() });
  };

  create_user = async (pass) => {
    var a;
    await this.props.web3.eth.personal.newAccount(pass).then((value) => {
      a = value;
      console.log("Inside Create User", value);
    });
    // await this.props.web3.eth.personal.unlockAccount(
    //   "0x0f556A3AA96D6a702930936132c42030bA167a3D",
    //   "rohit",
    //   60
    // );

    await this.props.web3.eth.sendTransaction({
      to: a,
      from: "0xb9a572a2e6c874bA4b2A2995A627fF4B34c653F8",
      value: this.props.web3.utils.toHex(
        this.props.web3.utils.toWei("10", "ether")
      ),
    });
    console.log("After Create User");
    return a;
  };

  createWeb3 = async (e) => {
    this.props.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8546")
    );
    this.props.auth = new this.props.web3.eth.Contract([
      {
        constant: false,
        inputs: [
          {
            name: "id",
            type: "address",
          },
          {
            name: "userName",
            type: "string",
          },
          {
            name: "pass",
            type: "string",
          },
        ],
        name: "changePass",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "id",
            type: "address",
          },
          {
            name: "userName",
            type: "string",
          },
        ],
        name: "delAuth",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "userName",
            type: "string",
          },
          {
            name: "id",
            type: "address",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "pass",
            type: "string",
          },
          {
            name: "que",
            type: "string",
          },
          {
            name: "ans",
            type: "string",
          },
        ],
        name: "regiter",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "userName",
            type: "string",
          },
          {
            name: "pass",
            type: "string",
          },
        ],
        name: "authenticate",
        outputs: [
          {
            name: "",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "userName",
            type: "string",
          },
          {
            name: "que",
            type: "string",
          },
          {
            name: "ans",
            type: "string",
          },
        ],
        name: "forgrtPass",
        outputs: [
          {
            name: "",
            type: "string",
          },
          {
            name: "",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ]);
    this.props.accounts = await this.props.web3.eth.getAccounts();
  };
}

