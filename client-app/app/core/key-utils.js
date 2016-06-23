"use strict";
define(function (require) {

    var appProxy = require('/app/core/app-proxy.js');
    var CryptoJS = require('crypto-js');
    var JSEncrypt = require('jsencrypt').JSEncrypt;
    var PublicKey = require('text!/public-key');
    
    var publicKeyEncrypt = new JSEncrypt();
    publicKeyEncrypt.setPublicKey(PublicKey);

    return {
        generateAesKey: function () {
            var key = "";
            while (key.length < 32) {
                key = key + Math.random().toString(36).substring(2);
            }
            return key.substring(0, 31);
        },

        publicKeyEncrypt: function (plaintext) {
            return publicKeyEncrypt.encrypt(plaintext);
        },

        aesEncrypt: function (plaintext) {
            return CryptoJS.AES.encrypt(plaintext, appProxy.getAesKey()).toString();
        },

        aesDecrypt: function (encryptedText) {
            return CryptoJS.AES.decrypt(encryptedText, appProxy.getAesKey()).toString(CryptoJS.enc.Utf8);
        },
    };

});