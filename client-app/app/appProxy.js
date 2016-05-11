"use strict";
define(function (require) {

    var appConstants = require('/app-constants');
    var facade = require('./facade.js');

    var currentUser = null;
    var plaintextProfile = null;

    facade.subscribe(appConstants.S2C_USER_LOGGED_IN, function (user) {
        currentUser = user;
        facade.sendNotification(appConstants.C2S_GET_PLAINTEXT_PROFILE);
    });

    facade.subscribe(appConstants.S2C_SEND_PLAINTEXT_PROFILE, function (profile) {
        plaintextProfile = profile;
        facade.sendNotification(appConstants.C2S_GET_CONTACT_LIST);
    });

    facade.subscribe(appConstants.C2S_LOG_OUT_USER, function () {
        currentUser = null;
    });

    console.log('appProxy.js required');

    return {
        getCurrentUser: function () {
            return currentUser;
        },

        getCurrentUserId: function () {
            return currentUser._id;
        },

        getPlainTextProfileId: function () {
            return plaintextProfile._id;
        },

    };

});