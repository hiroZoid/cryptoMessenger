"use strict";
define(function (require) {

    var appConstants = require('/app-constants');
    var facade = require('./facade.js');

    var currentUser = null;
    var recipientUser = null;
    var plaintextProfile = null;

    facade.subscribe(appConstants.S2C_USER_LOGGED_IN, function (user) {
        currentUser = user;
    });

    facade.subscribe(appConstants.C2S_LOG_OUT_USER, function () {
        currentUser = null;
    });

    facade.subscribe(appConstants.SELECT_CONTACT, function (user) {
        //socket.emit(appConstants.C2S_GET_CONTACT_LIST);
        recipientUser = user;
    });

    facade.subscribe(appConstants.S2C_SEND_PLAINTEXT_PROFILE, function (profile) {
        plaintextProfile = profile;
    });

    console.log('appProxy.js required');

    return {
        getCurrentUser: (function () {
            return currentUser;
        }).bind(this),

        getCurrentUserId: (function () {
            return currentUser._id;
        }).bind(this),

        getRecipientUserId: (function () {
            return recipientUser._id;
        }).bind(this),
        
        getPlainTextProfileId: (function () {
            return plaintextProfile._id;
        }).bind(this),
        
        
    };

});