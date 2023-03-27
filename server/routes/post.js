const router = require("express").Router();
const { generateRSAKeyPair,RSAEncrypt,RSADecrypt,generatePostHash } = require("../util/algorithm-util");

router.post("/createPost", async(req,res) =>  {
    try{
        const {username,post} = req.body;
        var {mpk,msk}=generateRSAKeyPair(username,post);
        const generatePostHash = generatePostHash(post);
        const data = {
            nameEnc:RSAEncrypt(username,mpk,username).toString("base64"),
            postEnc:RSAEncrypt(post,mpk).toString("base64")
        }
        res.status(200).send({message:"Post has been encrypted"});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:"Internal Server Error"});
    }
});