"use strict";
define(function (require) {
    var socket = require('/socket.io/socket.io.js')();
    var appConstants = require('/app-constants');
    var facade = require('./facade.js');

    socket.on(appConstants.SOCKET_SENDING_CONTACT_LIST, function (contactList) {
        facade.sendNotification(appConstants.SOCKET_SENDING_CONTACT_LIST, contactList);
        console.log(contactList);
    });

    socket.on(appConstants.SOCKET_INVALID_CREDENTIALS, function () {
        facade.sendNotification(appConstants.SOCKET_INVALID_CREDENTIALS);
        console.log('Invalid credentials!');
    });


    console.log('socket.js executed!');

    return socket;
});