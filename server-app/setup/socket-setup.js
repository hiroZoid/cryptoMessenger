"use strict";

module.exports.setup = function (httpServer) {

    let io = require('socket.io').listen(httpServer);
    let socketBusiness = require('../business/socket-business.js');
    let appConstants = require('../app-constants.js');

    io.on('connection', function (socket) {

        socketBusiness.socketConnected(socket);
        console.log('Socket client connected');

        socket.on('disconnect', function () {
            socketBusiness.userDisconnected(socket);
            console.log('Socket client disconnected.');
        });

        socket.on(appConstants.SOCKET_CHAT_MESSAGE, function (msg) {
            console.log(msg);
            socketBusiness.handleChatMessageReceived(
                socket,
                msg.profile,
                msg.sender,
                msg.recipient,
                msg.message
            );
        })

        socket.on(appConstants.SOCKET_LOG_IN, function (credentials) {
            socketBusiness.loginUser(socket, credentials.username, credentials.password);
            console.log(credentials);
        })

        socket.on(appConstants.SOCKET_REGISTER_USER, function (userData) {
            socketBusiness.registerUser(socket, userData.nickname, userData.username, userData.password);
            console.log(userData);
        });

        socket.on(appConstants.SOCKET_RETRIEVE_CONTACT_LIST, function () {
            socketBusiness.sendContactList(socket);
        });

        socket.on(appConstants.SOCKET_RETRIEVE_PLAINTEXT_PROFILE, function () {
            socketBusiness.sendPlaintextProfile(socket);
        });

        socket.on(appConstants.SOCKET_USER_LOGGED_OUT, function () {
            socketBusiness.logoutUser(socket);
        });

    });

    console.log('socket-setup.js executed.');
};
