import React from "react";
import Web3 from "web3";
import { CONTRACT, ETH_PROVIDER, WEB3PROVIDER } from "../constants";
import { userABI } from "./abis/userABI";
import { ContainerService } from "./ContainerService";
export class UserService extends React.Component {
  props = {
    auth: null,
    accounts: [],
    web3: Web3,
    cont: new ContainerService(),
  };

  constructor() {
    super();
    this.createWeb3();
  }

  getuser = async (username) => {
    return await this.props.auth.methods.getUser(username).call();
  };

  getMaxfeePerGas = async () => {
    const block = await this.props.web3.eth.getBlock("latest");
    return Math.ceil(block.baseFeePerGas);
  };

  userExists = async (username) => {
    const response = await this.props.auth.methods.userExists(username).call();
    const resJson = Object.assign({}, response);
    return resJson;
  };

  getSignature = async (username) => {
    const response = await this.props.auth.methods
      .getSignature(username)
      .call();
    return Object.assign({}, response);
  };

  sign = async (userHash, masterPublicKey, signature, account, password) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .addToSignature(userHash, masterPublicKey, signature)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    console.log(next_gas_price);
    await this.props.auth.methods
      .addToSignature(userHash, masterPublicKey, signature)
      .send({
        from: account,
        gasPrice: gasEstimate,
        maxFeePerGas: next_gas_price,
        gas: 6721975,
      });
  };

  adduser = async (userName, password, masterPublicKey, token, account) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .createUser(userName, password, masterPublicKey, token)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    console.log(gasEstimate);
    const next_gas_price = await this.getMaxfeePerGas();
    console.log(next_gas_price);
    await this.props.auth.methods
      .createUser(userName, password, masterPublicKey, token)
      .send({
        from: account,
        gasPrice: gasEstimate,
        maxFeePerGas: next_gas_price,
        gas: 6721975,
      });
    const eve = await this.props.auth.events.UserCreated();
    console.log(eve);
  };

  deluser = async (id, name) => {
    await this.props.web3.eth.personal.unlockAccount(
      this.props.cont.getId(),
      this.props.cont.getPass(),
      60
    );
    await this.props.auth.methods
      .delUser(id, name)
      .send({ from: this.props.cont.getId() });
  };

  create_user = async (password) => {
    var account;
    await this.props.web3.eth.personal.newAccount(password).then((value) => {
      account = value;
    });

    await this.props.web3.eth.personal.unlockAccount(account, password, 60);

    await this.props.web3.eth.sendTransaction({
      to: account,
      from: ETH_PROVIDER,
      value: this.props.web3.utils.toHex(
        this.props.web3.utils.toWei("10", "ether")
      ),
    });
    console.log("User created with id " + account);
    return account;
  };

  createWeb3 = async (e) => {
    this.props.web3 = new Web3(new Web3.providers.HttpProvider(WEB3PROVIDER));
    this.props.auth = new this.props.web3.eth.Contract(
      userABI,
      CONTRACT.USER_CREATION_CONTRACT
    );
    this.props.accounts = await this.props.web3.eth.getAccounts();
  };
}
