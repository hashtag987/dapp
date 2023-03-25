import React from "react";
import Web3 from "web3";
import { ContainerService } from "./ContainerService";
export class UserInfoService extends React.Component {
  props = {
    // contractDeployedAt: "0x42a6e27Ee9fA4CEdD9779B667D2f2C4652cC47d3",
    auth: null,
    accounts: [],
    web3: Web3,
    cont: new ContainerService(),
  };
  constructor() {
    super();
    console.log("UserInfoService Initialized...");
  }

  getinfo = async (userName) => {
    // it calls getOrganizer method of exhibition contract
    return await this.props.auth.methods
      .getInfo(userName)
      .call({ from: this.props.cont.getId() });
  };

  newuser = async (userName, id, photo, name) => {
    await this.props.web3.eth.personal.unlockAccount(
      this.props.cont.getId(),
      this.props.cont.getPass(),
      60
    );
    await this.props.auth.methods
      .newUser(userName, id, photo, name)
      .send({ from: this.props.cont.getId() });
  };

  deluser = async (id, userName) => {
    await this.props.web3.eth.personal.unlockAccount(
      this.props.cont.getId(),
      this.props.cont.getPass(),
      60
    );
    await this.props.auth.methods
      .delUser(id, userName)
      .send({ from: this.props.cont.getId() });
  };

  setphoto = async (id, userName, photo) => {
    await this.props.web3.eth.personal.unlockAccount(
      this.props.cont.getId(),
      this.props.cont.getPass(),
      60
    );
    await this.props.auth.methods
      .setPhoto(id, userName, photo)
      .send({ from: this.props.cont.getId() });
  };

  setname = async (id, userName, name) => {
    await this.props.web3.eth.personal.unlockAccount(
      this.props.cont.getId(),
      this.props.cont.getPass(),
      60
    );
    await this.props.auth.methods
      .setName(id, userName, name)
      .send({ from: this.props.cont.getId() });
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
        ],
        name: "delUser",
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
            name: "photo",
            type: "address",
          },
          {
            name: "name",
            type: "string",
          },
        ],
        name: "newUser",
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
          {
            name: "name",
            type: "string",
          },
        ],
        name: "setName",
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
          {
            name: "photo",
            type: "address",
          },
        ],
        name: "setPhoto",
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
        ],
        name: "getInfo",
        outputs: [
          {
            name: "",
            type: "address",
          },
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

