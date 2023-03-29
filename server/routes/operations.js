const router = require("express").Router();
const {
    generateRSAKeyPair,
    RSAEncrypt,
    RSADecrypt,
    signUser,
    verifyUser,
    generateUserHash,
    generateFriendRequestId
} = require("../util/algorithm-util");

router.post("/sendRequest", async (req, res) => {
    try {
        const {friendPk}=req.body;
        const friendRequestId=generateFriendRequestId();
        const encFrinedReqId=RSAEncrypt(friendRequestId,friendPk);
        res.status(200).send({message : "Care to be my friend? ;-)", friendRequestId:encFrinedReqId});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});