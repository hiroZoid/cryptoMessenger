"use strict";

module.exports.setup = function (httpServer) {

    let io = require('socket.io').listen(httpServer);
    let socketBusiness = require('../business/socket-business.js');
    let appConstants = require('../app-constants.js');

    io.on('connection', function (socket) {

        socketBusiness.socketConnected(socket);
        console.log('Socket client connected');

        socket.on('disconnect', function () {
            socketBusiness.socketDisconnected(socket);
            console.log('Socket client disconnected.');
        });

        socket.on(appConstants.C2S_REGISTER_USER, function (userData) {
            socketBusiness.registerUser(socket, userData.nickname, userData.username, userData.password);
            console.log(userData);
        });

        socket.on(appConstants.C2S_LOG_IN_USER, function (credentials) {
            socketBusiness.loginUser(socket, credentials.username, credentials.password);
            console.log(credentials);
        })

        socket.on(appConstants.C2S_LOG_OUT_USER, function () {
            socketBusiness.logoutUser(socket);
        });

        socket.on(appConstants.C2S_GET_CONTACT_LIST, function () {
            socketBusiness.sendContactList(socket);
        });

        socket.on(appConstants.C2S_GET_PLAINTEXT_PROFILE, function () {
            socketBusiness.sendPlaintextProfile(socket);
        });

        socket.on(appConstants.C2S_GET_CHAT_HISTORY, function () {
            socketBusiness.sendFullHistory(socket);
        });

        socket.on(appConstants.C2S_CHAT_MESSAGE, function (msg) {
            console.log(msg);
            socketBusiness.handleChatMessageReceived(
                socket,
                msg.profile,
                msg.sender,
                msg.recipient,
                msg.message
            );
        })

    });

    console.log('socket-setup.js executed.');
};
