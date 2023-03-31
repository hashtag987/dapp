const crypto = require("crypto");
const cryptoJs = require("crypto-js");
const generateRSAKeyPair = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  return { mpk: publicKey, msk: privateKey };
};

const RSAEncrypt = (pdata, key) => {
  return crypto.publicEncrypt(
    {
      key: key,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(pdata)
  );
};

const RSADecrypt = (cdata, key) => {
  return crypto.privateDecrypt(
    {
      key: key,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    cdata
  );
};

//unused
const createAccountInBlockChain = (username, password) => {
  const Upk = cryptoJs.SHA256([username, password].join()).toString();
  const Usk = cryptoJs.SHA256([password, username].join()).toString();
  return { pk: Upk, sk: Usk };
};

const signUser = (username, password, privateKey) => {
  const signer = crypto.createSign("RSA-SHA256");
  console.log(signer);
  signer.update(username);
  signer.update(password);
  sign = signer.sign(privateKey, "hex");
  console.log(sign);
  return sign;
};

const verifyUser = (username, password, publicKey, sign) => {
  verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(username);
  verifier.update(password);
  result = verifier.verify(publicKey, sign, "hex");
  return result;
};

const generateUserHash = (username) => {
  return cryptoJs.SHA256(username).toString();
};

const generateFriendRequestId = () => {
  return crypto.randomBytes(32).toString("base64");
};

module.exports = {
  generateRSAKeyPair,
  RSADecrypt,
  RSAEncrypt,
  createAccountInBlockChain,
  signUser,
  verifyUser,
  generateUserHash,
  generateFriendRequestId,
};
