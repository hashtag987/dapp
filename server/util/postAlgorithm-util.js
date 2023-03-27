const crypto = require("crypto");
const cryptoJs = require("crypto-js")
const { RSAEncrypt,RSADecrypt,generateRSAKeyPair } = require("../server/util/algorithm-util");


const generatePostHash = (post) =>{
    return cryptoJs.SHA256(post).toString();
}


// const post='hi there!';
// const uniqueId=crypto.randomBytes(32).toString("base64");
// const alice=generateRSAKeyPair(),bob=generateRSAKeyPair();
// const Bpk=bob.mpk,Bsk=bob.msk;
// const Apk=alice.mpk,Ask=alice.msk;

// const encPostForAlice=RSAEncrypt(post,Apk),encPostForBob=RSAEncrypt(post,Bpk);
// const decPostByAlice=RSADecrypt(encPostForAlice,Ask),decPostByBob=RSADecrypt(encPostForBob,Bsk);

// console.log(decPostByAlice+' '+decPostByBob);