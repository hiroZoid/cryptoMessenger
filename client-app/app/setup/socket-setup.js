"use strict";
define(function (require) {

    return function () {

        var appConstants = require('/app-constants.js');
        var facade = require('/app/core/facade.js');
        var socket = require('/socket.io/socket.io.js')();
        var keyUtils = require('/app/core/key-utils.js');

        function encryptAndEmit(notification, message) {
            if (message === undefined) {
                socket.emit(notification);
            } else {
                var plaintext = JSON.stringify(message);
                var encrypted = keyUtils.aesEncrypt(plaintext)
                socket.emit(notification, encrypted);
            }
        }

        // Listen to facade notifications and send to server via socket

        facade.subscribe(appConstants.C2S_REGISTER_USER, function (newUser) {
            socket.emit(appConstants.C2S_REGISTER_USER, newUser);
        });

        facade.subscribe(appConstants.C2S_LOG_IN_USER, function (credentials) {
            socket.emit(appConstants.C2S_LOG_IN_USER, credentials);
        });

        facade.subscribe(appConstants.C2S_LOG_OUT_USER, function () {
            socket.emit(appConstants.C2S_LOG_OUT_USER);
        });

        facade.subscribe(appConstants.C2S_GET_CONTACT_LIST, function () {
            socket.emit(appConstants.C2S_GET_CONTACT_LIST);
        });

        facade.subscribe(appConstants.C2S_GET_CHAT_HISTORY, function (recipientUserId) {
            socket.emit(appConstants.C2S_GET_CHAT_HISTORY, recipientUserId);
        });

        facade.subscribe(appConstants.C2S_CHAT_MESSAGE, function (msg) {
            socket.emit(appConstants.C2S_CHAT_MESSAGE, msg);
        });

        facade.subscribe(appConstants.C2S_SENDING_KEY, function (msg) {
            socket.emit(appConstants.C2S_SENDING_KEY, msg);
        });



        // Listen to server messages and notificate them throught facade

        socket.on(appConstants.S2C_DATABASE_ERROR, function (errMsg) {
            facade.sendNotification(appConstants.S2C_DATABASE_ERROR, errMsg);
            alert('Database error:\n' + errMsg);
        });

        socket.on(appConstants.S2C_USER_REGISTERED, function () {
            facade.sendNotification(appConstants.S2C_USER_REGISTERED);
        });

        socket.on(appConstants.S2C_USERNAME_EXISTS, function () {
            facade.sendNotification(appConstants.S2C_USERNAME_EXISTS);
        });

        socket.on(appConstants.S2C_USER_LOGGED_IN, function (user) {
            facade.sendNotification(appConstants.S2C_USER_LOGGED_IN, user);
        });

        socket.on(appConstants.S2C_INVALID_CREDENTIALS, function () {
            facade.sendNotification(appConstants.S2C_INVALID_CREDENTIALS);
        });

        socket.on(appConstants.S2C_SEND_CONTACT_LIST, function (contactList) {
            facade.sendNotification(appConstants.S2C_SEND_CONTACT_LIST, contactList);
        });

        socket.on(appConstants.S2C_SEND_CHAT_HISTORY, function (contactHistory) {
            facade.sendNotification(appConstants.S2C_SEND_CHAT_HISTORY, contactHistory);
        });

        socket.on(appConstants.S2C_CHAT_MESSAGE, function (msg) {
            facade.sendNotification(appConstants.S2C_CHAT_MESSAGE, msg);
        });

        socket.on(appConstants.S2C_KEY_RECEIVED, function (msg) {
            facade.sendNotification(appConstants.S2C_KEY_RECEIVED, msg);
        });

        console.log('socket-setup.js required');

    }
});