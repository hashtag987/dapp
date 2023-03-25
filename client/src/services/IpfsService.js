import React from "react";
import IpfsHttpClient from "ipfs-http-client";
export class IpfsService extends React.Component {
  props = {
    ipfs: null,
    hash: "",
  };
  constructor() {
    super();
    console.log("IpfsService Initialized...")
    try {
      this.props.ipfs = new IpfsHttpClient({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
      });
    } catch (err) {
      console.log("Error", err);
      throw new Error("Unable to access IPFS node daemon on Infura network");
    }
  }

  setText=async(value)=>{
    for await (const result of this.props.ipfs.add(value)) {
      console.log('Output of set',result);
      this.props.hash = result.path;
    }
    return this.props.hash;
  }

  getText=async(hash)=>{
    for await (const file of this.props.ipfs.get(hash)) {
      console.log('Uotput of get', file);
      for await (const chunk of file.content) {
        this.props.content = chunk;
      }
    }
    return this.props.content.toString();
  }

  setImg=async(files)=>{
    for await (const result of this.props.ipfs.files.add(files, { recursive: true })) {
      console.log('Output of set',result)
      console.log('Image Uploaded',result.path)
      this.props.hash = result.path
    }
    return this.props.hash;
  }

  getImg=(hash)=>{
    return 'https://gateway.ipfs.io/ipfs/'+hash;
  }
}

