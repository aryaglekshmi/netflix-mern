const CryptoJS = require("crypto-js");

function encryptPassword(password) {
     return CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString()
}

function decryptPassword(password) {
    const bytes = CryptoJS.AES.decrypt(password, process.env.SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encryptPassword,
    decryptPassword
}