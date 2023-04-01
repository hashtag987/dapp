const router = require("express").Router();
const {
  generateRSAKeyPair,
  RSAEncrypt,
  RSADecrypt,
  signUser,
  verifyUser,
  generateUserHash,
  generateFriendRequestId,
} = require("../util/algorithm-util");

router.post("/sendRequest", async (req, res) => {
  try {
    const { friendPk } = req.body;
    const friendRequestId = generateFriendRequestId();
    const encFrinedReqId = RSAEncrypt(friendRequestId, friendPk);
    res.status(200).send({
      message: "Care to be my friend? ;-)",
      friendRequestId: encFrinedReqId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/encryptPost", async (req, res) => {
  try {
    const { post, mpk } = req.body;
    const encPost = RSAEncrypt(post, mpk).toString("base64");
    res.status(200).send({
      encPost: encPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/decryptPost", async (req, res) => {
  try {
    const { post, msk } = req.body;
    const decPost = RSADecrypt(Buffer.from(post, "base64"), msk).toString();
    res.status(200).send({
      decPost: decPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
module.exports = router;
