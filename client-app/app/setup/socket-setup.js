"use strict";
define(function (require) {

    return function () {

        var appConstants = require('/app-constants.js');
        var facade = require('/app/core/facade.js');
        var socket = require('/socket.io/socket.io.js')();
        var keyUtils = require('/app/core/key-utils.js');
        var appProxy = require('/app/core/app-proxy.js');

        socket.on('connect', function () {
            appProxy.setSocketId(socket.io.engine.id);
            console.log('appProxy.getSocketId()', appProxy.getSocketId());
        });

        function encryptAndEmit(notification, message) {
            if (message === undefined) {
                socket.emit(notification);
            } else {
                var plaintext = JSON.stringify(message);
                var encrypted = keyUtils.aesEncrypt(plaintext)
                socket.emit(notification, encrypted);
            }
        }

        function decryptAndSendNotification(notification, encryptedMessage) {
            if (encryptedMessage === undefined) {
                facade.sendNotification(notification)
            } else {
                var plaintext = keyUtils.aesDecrypt(encryptedMessage);
                var object = JSON.parse(plaintext);
                facade.sendNotification(notification, object)
            }
        }

        // Listen to facade notifications and send to server via socket

        facade.subscribe(appConstants.C2S_REGISTER_USER, function (newUser) {
            encryptAndEmit(appConstants.C2S_REGISTER_USER, newUser);
        });

        facade.subscribe(appConstants.C2S_UPDATE_USER, function (currentUser) {
            encryptAndEmit(appConstants.C2S_UPDATE_USER, currentUser);
        });

        facade.subscribe(appConstants.C2S_LOG_IN_USER, function (credentials) {
            encryptAndEmit(appConstants.C2S_LOG_IN_USER, credentials);
        });

        facade.subscribe(appConstants.C2S_LOG_OUT_USER, function () {
            encryptAndEmit(appConstants.C2S_LOG_OUT_USER);
        });

        facade.subscribe(appConstants.C2S_GET_CONTACT_LIST, function () {
            encryptAndEmit(appConstants.C2S_GET_CONTACT_LIST);
        });

        facade.subscribe(appConstants.C2S_GET_CHAT_HISTORY, function (recipientUserId) {
            encryptAndEmit(appConstants.C2S_GET_CHAT_HISTORY, recipientUserId);
        });

        facade.subscribe(appConstants.C2S_CHAT_MESSAGE, function (msg) {
            encryptAndEmit(appConstants.C2S_CHAT_MESSAGE, msg);
        });

        facade.subscribe(appConstants.C2S_SENDING_KEY, function (msg) {
            socket.emit(appConstants.C2S_SENDING_KEY, msg);
        });



        // Listen to server messages and notificate them throught facade

        socket.on(appConstants.S2C_DATABASE_ERROR, function (errMsg) {
            decryptAndSendNotification(appConstants.S2C_DATABASE_ERROR, errMsg);
        });

        socket.on(appConstants.S2C_USER_REGISTERED, function () {
            decryptAndSendNotification(appConstants.S2C_USER_REGISTERED);
        });

        socket.on(appConstants.S2C_USERNAME_EXISTS, function () {
            decryptAndSendNotification(appConstants.S2C_USERNAME_EXISTS);
        });

        socket.on(appConstants.S2C_USER_LOGGED_IN, function (user) {
            decryptAndSendNotification(appConstants.S2C_USER_LOGGED_IN, user);
        });

        socket.on(appConstants.S2C_INVALID_CREDENTIALS, function () {
            decryptAndSendNotification(appConstants.S2C_INVALID_CREDENTIALS);
        });

        socket.on(appConstants.S2C_SEND_CONTACT_LIST, function (contactList) {
            decryptAndSendNotification(appConstants.S2C_SEND_CONTACT_LIST, contactList);
        });

        socket.on(appConstants.S2C_SEND_CHAT_HISTORY, function (contactHistory) {
            decryptAndSendNotification(appConstants.S2C_SEND_CHAT_HISTORY, contactHistory);
        });

        socket.on(appConstants.S2C_CHAT_MESSAGE, function (msg) {
            decryptAndSendNotification(appConstants.S2C_CHAT_MESSAGE, msg);
        });

        socket.on(appConstants.S2C_KEY_RECEIVED, function () {
            decryptAndSendNotification(appConstants.S2C_KEY_RECEIVED);
        });
        
        socket.on(appConstants.S2C_AVATAR_UPLOADED, function () {
            decryptAndSendNotification(appConstants.S2C_AVATAR_UPLOADED);
        });

        socket.on(appConstants.S2C_AVATAR_UPDATED, function () {
            decryptAndSendNotification(appConstants.S2C_AVATAR_UPDATED);
        });

        socket.on(appConstants.S2C_USER_UPDATED, function () {
            decryptAndSendNotification(appConstants.S2C_USER_UPDATED);
        });

        console.log('socket-setup.js required');

    }
});