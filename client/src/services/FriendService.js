import React from "react";
import Web3 from "web3";
import { CONTRACT, WEB3PROVIDER } from "../constants";
import { FriendRequestABI } from "./abis/FriendRequestABI";
import { ContainerService } from "./ContainerService";
export class FriendService extends React.Component {
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

  getMaxfeePerGas = async () => {
    const block = await this.props.web3.eth.getBlock("latest");
    return Math.ceil(block.baseFeePerGas);
  };

  addUserId = async (account, password) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .addUserId(account)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.addUserId(account).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
  };

  addFriend = async (account, password, friendId, isApproved) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .addFriend(account, friendId, isApproved)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    const methods = await this.props.auth.methods
      .addFriend(account, friendId, isApproved)
      .send({
        from: account,
        gasPrice: gasEstimate,
        maxFeePerGas: next_gas_price,
        gas: 6721975,
      });
    return methods;
  };

  addToRequested = async (account, password, friendId) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .addToRequested(account, friendId)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.addToRequested(account, friendId).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
  };

  deleteFromRequested = async (account, password, friendId) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .deleteFromRequested(friendId, account)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.deleteFromRequested(friendId, account).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
  };

  undoRequest = async (account, password, friendId) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .deleteFromRequested(account, friendId)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.deleteFromRequested(account, friendId).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
  };

  removeFriend = async (account, password, friendId) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .removeFriend(account, friendId)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    let next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.removeFriend(account, friendId).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
    next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.removeFriend(friendId, account).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
  };

  getFriends = async (userId) => {
    const response = await this.props.auth.methods.getFriends(userId).call();
    let friends = [];
    for (let user of response) {
      if (user.userid.length > 0) {
        friends.push(Object.assign({}, user));
      }
    }
    return friends;
  };

  getRequested = async (userId) => {
    const response = await this.props.auth.methods.getRequested(userId).call();
    return response;
  };

  getPendingRequests = async (userId) => {
    const response = await this.props.auth.methods
      .getPendingRequests(userId)
      .call();
    let friends = [];
    for (let user of response) {
      friends.push(Object.assign({}, user));
    }
    return friends;
  };

  approveRequest = async (account, password, friendId) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .approveRequest(account, friendId)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.approveRequest(account, friendId).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
    return 200;
  };

  addToNotification = async (
    account,
    password,
    friendId,
    notId,
    notType,
    timeStamp,
    message,
    isRead
  ) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .addToNotification(
        notId,
        friendId,
        account,
        timeStamp,
        notType,
        message,
        isRead
      )
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods
      .addToNotification(
        notId,
        friendId,
        account,
        timeStamp,
        notType,
        message,
        isRead
      )
      .send({
        from: account,
        gasPrice: gasEstimate,
        maxFeePerGas: next_gas_price,
        gas: 6721975,
      });
    return 200;
  };

  markAsReadNotification = async (account, password) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .markAsReadNotification(account)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.markAsReadNotification(account).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
    return 200;
  };
  
  getNotifications = async (userId) => {
    const response = await this.props.auth.methods
      .getNotifications(userId)
      .call();
    let notifications = [];
    for (let notification of response) {
      notifications.push(Object.assign({}, notification));
    }
    return notifications;
  };

  getUnreadNotificationsCount = async (userId) => {
    const count = await this.props.auth.methods
      .getUnreadNotificationsCount(userId)
      .call();
    return count;
  };

  deleteAllNotifications = async (account, password) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .deleteAllNotifications(account)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.deleteAllNotifications(account).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
    return 200;
  };

  deleteNotification = async (account, password, notId) => {
    await this.props.web3.eth.personal.unlockAccount(account, password, 60);
    const gasEstimate = await this.props.auth.methods
      .deleteNotification(account, notId)
      .estimateGas({ gas: 6721975 }, function (error, gasAmount) {
        if (error) {
          console.log(error);
        }
        if (gasAmount === 6721975) console.log("Method ran out of gas");
      });
    const next_gas_price = await this.getMaxfeePerGas();
    await this.props.auth.methods.deleteNotification(account, notId).send({
      from: account,
      gasPrice: gasEstimate,
      maxFeePerGas: next_gas_price,
      gas: 6721975,
    });
    return 200;
  };

  createWeb3 = async (e) => {
    this.props.web3 = new Web3(new Web3.providers.HttpProvider(WEB3PROVIDER));
    this.props.auth = new this.props.web3.eth.Contract(
      FriendRequestABI,
      CONTRACT.FRIEND_REQUEST
    );
    // this.props.accounts = await this.props.web3.eth.getAccounts();
  };
}
