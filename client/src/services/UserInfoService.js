import React from "react";
import Web3 from "web3";
import { CONTRACT, WEB3PROVIDER } from "../constants";
import { USER_INFO_ABI } from "./abis/userInfoABI";
import { ContainerService } from "./ContainerService";
export class UserInfoService extends React.Component {
  props = {
    auth: null,
    accounts: [],
    web3: Web3,
    cont: new ContainerService(),
  };

  getMaxfeePerGas = async () => {
    const block = await this.props.web3.eth.getBlock("latest");
    return Math.ceil(block.baseFeePerGas);
  };

  addUserInfo = async (name, userName, password, masterPublicKey, account) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .addUserInfo(account, name, userName, masterPublicKey)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods
      .addUserInfo(account, name, userName, masterPublicKey)
      .send({
        from: account,
        gasPrice: gasEstimate,
        maxFeePerGas: next_gas_price,
        gas: 6721975,
      });
  };

  getAllusers = async () => {
    let users = [];
    const response = await this.props.auth.methods.getAllUsers().call();
    for (let user of response) {
      users.push(Object.assign({}, user));
    }
    return users;
  };
  constructor() {
    super();
    this.createWeb3();
  }

  getRecommendations = async (friendsOrRequests) => {
    let users = [];
    const response = await this.props.auth.methods
      .getRecommendations(friendsOrRequests)
      .call();
    for (let user of response) {
      users.push(Object.assign({}, user));
    }
    return users;
  };

  getUser = async (username) => {
    const user = await this.props.auth.methods.getUser(username).call();
    return Object.assign({}, user);
  };

  getUserById = async (userId) => {
    const user = await this.props.auth.methods.getUserById(userId).call();
    return Object.assign({}, user);
  };

  createWeb3 = async (e) => {
    this.props.web3 = new Web3(new Web3.providers.HttpProvider(WEB3PROVIDER));
    this.props.auth = new this.props.web3.eth.Contract(
      USER_INFO_ABI,
      CONTRACT.USER_MANAGEMENT_CONTRACT
    );
    this.props.accounts = await this.props.web3.eth.getAccounts();
  };
}
