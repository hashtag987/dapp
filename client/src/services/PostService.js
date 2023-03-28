import React from "react";
import Web3 from "web3";
import { CONTRACT, ETH_PROVIDER, WEB3PROVIDER } from "../constants";
//import { userABI } from "./abis/userABI";
import { ContainerService } from "./ContainerService";

export class PostService extends React.Component{
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

    getPost = async(postId) => {
        
    }
}