"use strict";
define(function (require) {
    return function () {

        var appConstants = require('/app-constants.js');
        var facade = require('/app/core/facade.js');
        var appProxy = require('/app/core/app-proxy.js');
        var keyUtils = require('/app/core/key-utils.js');

        var aesKey = keyUtils.generateAesKey();
        appProxy.setAesKey(aesKey);
        console.log('aesKey:', aesKey);
        var encryptedAesKey = keyUtils.publicKeyEncrypt(aesKey);

        facade.sendNotification(appConstants.C2S_SENDING_KEY, encryptedAesKey);

    }
});