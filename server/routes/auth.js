const router = require("express").Router();
const { generateRSAKeyPair,RSAEncrypt,RSADecrypt,signUser,verifyUser,generateUserHash } = require("../util/algorithm-util");

router.post("/createuser", async (req, res) => {
	try {
		const {username,password,token} = req.body;
        console.log(req.body);
        var {mpk,msk}= generateRSAKeyPair(username,password);
        const userHash = generateUserHash(username);
        const data = {
            nameEnc:RSAEncrypt(username,mpk,username).toString("base64"),
            passwordEnc:RSAEncrypt(password,mpk).toString("base64"),
            tokenEnc:RSAEncrypt(token,mpk).toString("base64"),
            masterPublicKey:mpk,
            signature:signUser(userHash,password,msk),
            userHash:userHash
        }
        res.status(200).send({message:"Encryption is performed successfully",data:data})
	} catch (error) {
        console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/verifyuser", async (req, res) => {
	try {
		const {username,password,mpk,signature} = req.body;
        const userHash = generateUserHash(username);
        const verified = verifyUser(userHash,password,mpk,signature)
        res.status(200).send({message:"Decryption is performed successfully",data:verified})
	} catch (error) {
        console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/userexists", async (req, res) => {
	try {
		const {username} = req.body;
        const userHash = generateUserHash(username);
        res.status(200).send({message:"Decryption is performed successfully",userHash:userHash})
	} catch (error) {
        console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;