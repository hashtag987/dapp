import React from "react";
import Web3 from "web3";
import { CONTRACT, ETH_PROVIDER, WEB3PROVIDER } from "../constants";
import { PostABI } from "./abis/postABI";
import { ContainerService } from "./ContainerService";
export class PostService extends React.Component {
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

  createPost = async (account, password, postHash, timestamp) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .createPost(postHash, timestamp, account)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    console.log(gasEstimate);
    const next_gas_price = await this.getMaxfeePerGas();
    console.log(next_gas_price);
    const postResponse = await this.props.auth.methods
      .createPost(postHash, timestamp, account)
      .send({
        from: account,
        gasPrice: gasEstimate,
        maxFeePerGas: next_gas_price,
        gas: 6721975,
      });
      console.log("******Post******");
      return postResponse
  };

  mapPostToFriend = async (account, password, postHash, timestamp, friendId) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .mapPostToFriend(postHash, timestamp, account, friendId)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    console.log(gasEstimate);
    const next_gas_price = await this.getMaxfeePerGas();
    console.log(next_gas_price);
    const postResponse = await this.props.auth.methods
      .mapPostToFriend(postHash, timestamp, account, friendId)
      .send({
        from: account,
        gasPrice: gasEstimate,
        maxFeePerGas: next_gas_price,
        gas: 6721975,
      });
      console.log("******Post to Friends******");
      return postResponse
  };

  getPosts = async (userId) => {
    try {
      let posts = [];
      const response = await this.props.auth.methods.getPosts(userId).call();
      for (let post of response) {
        posts.push(Object.assign({}, post));
      }
      return posts;
    } catch (error) {
      console.log(error);
    }
  };
  constructor() {
    super();
    this.createWeb3();
  }

  createWeb3 = async (e) => {
    this.props.web3 = new Web3(new Web3.providers.HttpProvider(WEB3PROVIDER));
    this.props.auth = new this.props.web3.eth.Contract(
      PostABI,
      CONTRACT.POST_CONTRACT
    );
    // this.props.accounts = await this.props.web3.eth.getAccounts();
  };
}
