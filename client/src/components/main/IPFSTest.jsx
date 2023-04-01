import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { URL } from "../../constants";
import axios from "axios";
const IPFSTest = () => {
  const [imageUrl, setImageUrl] = useState("");

  async function uploadImage(event) {
    const file = event.target.files[0];

    const projectId = "2Mlf2LAi9EoJre7ZtOX6cQUsc1v";
    const projectSecret = "29274a890835a3b9a224f7f0a01222c5";
    const TOKEN = await axios.post(URL.DOMAIN + URL.TOKEN_BUFFER, {
      id: projectId,
      key: projectSecret,
    });
    console.log(TOKEN);
    const auth = "Basic " + TOKEN.data.data;

    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
    const { cid } = await client.add(file);
    const url = `https://ipfs.io/ipfs/${cid}`;
    console.log(cid);
    window.location.href=url;
    setImageUrl(url);
  }
  return (
    <div>
      <input type="file" onChange={uploadImage} />
      {imageUrl && <img src={imageUrl} alt="Uploaded mage" />}
    </div>
  );
};

export default IPFSTest;
