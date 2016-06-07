"use strict";
define(function (require) {
    
    var socket = require('/socket.io/socket.io.js')();
    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');

    // Listen to facade notifications

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




    // Listen to server messages and notificate them throught facade

    socket.on(appConstants.S2C_DATABASE_ERROR, function (errMsg) {
        facade.sendNotification(appConstants.S2C_DATABASE_ERROR, errMsg);
        alert('Database error:\n' + errMsg);
        console.log(appConstants.S2C_DATABASE_ERROR);
    });

    socket.on(appConstants.S2C_USER_REGISTERED, function () {
        facade.sendNotification(appConstants.S2C_USER_REGISTERED);
        console.log(appConstants.S2C_USER_REGISTERED);
    });

    socket.on(appConstants.S2C_USERNAME_EXISTS, function () {
        facade.sendNotification(appConstants.S2C_USERNAME_EXISTS);
        console.log(appConstants.S2C_USERNAME_EXISTS);
    });

    socket.on(appConstants.S2C_USER_LOGGED_IN, function (user) {
        facade.sendNotification(appConstants.S2C_USER_LOGGED_IN, user);
        console.log(appConstants.S2C_USER_REGISTERED);
    });

    socket.on(appConstants.S2C_INVALID_CREDENTIALS, function () {
        facade.sendNotification(appConstants.S2C_INVALID_CREDENTIALS);
        console.log(appConstants.S2C_INVALID_CREDENTIALS);
    });

    socket.on(appConstants.S2C_SEND_CONTACT_LIST, function (contactList) {
        facade.sendNotification(appConstants.S2C_SEND_CONTACT_LIST, contactList);
        console.log(appConstants.S2C_SEND_CONTACT_LIST);
    });

    socket.on(appConstants.S2C_SEND_CHAT_HISTORY, function (contactHistory) {
        facade.sendNotification(appConstants.S2C_SEND_CHAT_HISTORY, contactHistory);
        console.log(appConstants.S2C_SEND_CHAT_HISTORY);
    });

    socket.on(appConstants.S2C_CHAT_MESSAGE, function (msg) {
        facade.sendNotification(appConstants.S2C_CHAT_MESSAGE, msg);
        console.log(appConstants.S2C_CHAT_MESSAGE);
    });

    console.log('socket-setup.js required');

});