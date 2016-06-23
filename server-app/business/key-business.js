"use strict";

var CryptoJS = require('crypto-js');
var serverPath = process.cwd();
var fs = require('fs');
var ursa = require('ursa');
var privateRsaPem = fs.readFileSync(serverPath + '/rsa-keys/rsa_1024_priv.pem');
var privKey = ursa.createPrivateKey(privateRsaPem);

module.exports = {

    privateKeyDecrypt: function (plaintext) {
        return privKey.decrypt(plaintext, 'base64', 'utf8', ursa.RSA_PKCS1_PADDING);
    },

    aesEncrypt: function (plaintext, key) {
        return CryptoJS.AES.encrypt(plaintext, key).toString();
    },

    aesDecrypt: function (encryptedText, key) {
        return CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    },

};