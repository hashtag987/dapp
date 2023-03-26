const router = require("express").Router();
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);
const {
  generateRSAKeyPair,
  RSAEncrypt,
  RSADecrypt,
  signUser,
  verifyUser,
  generateUserHash,
} = require("../util/algorithm-util");

router.post("/createuser", async (req, res) => {
  try {
    const { name, confirmpassword, username, password, token } = req.body;
    const { error } = validateRegister({
      username: username,
      password: password,
      confirmpassword: confirmpassword,
      name: name,
    });
    if (error) {
      console.log(error.details);
      return res.status(400).send({ data: error.details });
    }
    var { mpk, msk } = generateRSAKeyPair(username, password);
    const userHash = generateUserHash(username);
    const data = {
      nameEnc: RSAEncrypt(username, mpk, username).toString("base64"),
      passwordEnc: RSAEncrypt(password, mpk).toString("base64"),
      tokenEnc: RSAEncrypt(token, mpk).toString("base64"),
      masterPublicKey: mpk,
      signature: signUser(userHash, password, msk),
      userHash: userHash,
    };
    console.log(data.signature);
    console.log(" ");
    console.log(data.userHash);
    res
      .status(200)
      .send({ message: "Encryption is performed successfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/verifyuser", async (req, res) => {
  try {
    const { username, password, mpk, signature } = req.body;
    console.log(req.body);
    const verified = verifyUser(username, password, mpk, signature);
    res.status(200).send({
      message: "Decryption is performed successfully",
      verified: verified,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/userexists", async (req, res) => {
  try {
    const { username } = req.body;
    const userHash = generateUserHash(username);
    res.status(200).send({
      message: "Decryption is performed successfully",
      userHash: userHash,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(30).required().label("Name"),
    confirmpassword: Joi.string().required().label("Conformation Password"),
    username: Joi.string().min(5).max(200).required().label("Username"),
    password: joiPassword
      .string()
      .min(6)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required()
      .label("Password")
      .messages({
        "password.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "password.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "password.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "password.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
      }),
  });
  return schema.validate(data, { abortEarly: false });
};
module.exports = router;
