import React from "react";
import Web3 from "web3";
export class ContainerService extends React.Component {
  props = {
    web3: Web3,
    auth: null,
    accounts: [],
    account: "",
    userName: "",
    pass: "",
    friendname: "",
    friendphoto: "",
  };
  constructor() {
    super();
    console.log("ContainerService Initialized...");
    this.createWeb3()
  }

  assign = async (id, userName) => {
    await this.props.web3.eth.personal.unlockAccount(
      this.getId(),
      this.getPass(),
      60
    );
    await this.props.auth.methods
      .assign(id, userName)
      .send({ from: this.props.account });
    this.props.account = id;
    this.props.userName = userName;
  };

  getId = () => {
    return this.props.account;
  };

  getUName = () => {
    return this.props.userName;
  };

  setId = (id) => {
    this.props.account = id;
  };

  setUName = (name) => {
    this.props.userName = name;
  };

  getPass = () => {
    return this.props.pass;
  };

  setPass = (pass) => {
    this.props.pass = pass;
  };

  setFriend = (name, photo) => {
    this.props.friendname = name;
    this.props.friendphoto = photo;
  };

  getFriendname = () => {
    return this.props.friendname;
  };

  getFriendphoto = () => {
    return this.props.friendphoto;
  };

  getuser = async (ind) => {
    // it calls getOrganizer method of exhibition contract
    return await this.props.auth.methods
      .onlines(ind)
      .call({ from: this.props.account });
  };

  adduser = async (name) => {
    await this.props.web3.eth.personal.unlockAccount(
      this.getId(),
      this.getPass(),
      60
    );
    await this.auth.methods
      .join(this.props.account, name)
      .send({ from: this.props.account });
  };

  deluser = async (ind) => {
    await this.props.web3.eth.personal.unlockAccount(
      this.getId(),
      this.getPass(),
      60
    );
    await this.props.auth.methods
      .left(this.props.account, ind)
      .send({ from: this.props.account });
  };

  createWeb3 = async (e) => {
    // this.props.web3 = new Web3(
    //   new Web3.providers.HttpProvider("http://127.0.0.1:8546")
    // );
    // this.props.auth = new this.props.web3.eth.Contract([
    //   {
    //     constant: false,
    //     inputs: [
    //       {
    //         name: "id",
    //         type: "address",
    //       },
    //       {
    //         name: "name",
    //         type: "string",
    //       },
    //     ],
    //     name: "join",
    //     outputs: [],
    //     payable: false,
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    //   {
    //     constant: false,
    //     inputs: [
    //       {
    //         name: "id",
    //         type: "address",
    //       },
    //       {
    //         name: "i",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "left",
    //     outputs: [],
    //     payable: false,
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    //   {
    //     constant: true,
    //     inputs: [
    //       {
    //         name: "",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "onlines",
    //     outputs: [
    //       {
    //         name: "",
    //         type: "string",
    //       },
    //     ],
    //     payable: false,
    //     stateMutability: "view",
    //     type: "function",
    //   },
    // ]);
    // this.props.accounts = await this.props.web3.eth.getAccounts();
    // this.props.account = this.props.accounts[0];
    // console.log("🚀 ~ file: ContainerService.js:162 ~ ContainerService ~ createWeb3= ~ this.props.account :", this.props.account )
    // this.props.userName = null;
  };
}
