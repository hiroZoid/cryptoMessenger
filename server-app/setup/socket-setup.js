"use strict";

module.exports.setup = function (httpServer) {

    let appConstants = require('../app-constants.js');
    let socketBusiness = require('../business/socket-business.js');
    var keyBusiness = require('../business/key-business.js');
    let io = require('socket.io').listen(httpServer);

    function decryptObject(socket, encryptedObject) {
        var aesKey = socketBusiness.getAesKey(socket);
        var plaintext = keyBusiness.aesDecrypt(encryptedObject, aesKey);
        var object = JSON.parse(plaintext);
        return object;
    }

    io.on('connection', function (socket) {

        socketBusiness.socketConnected(socket);
        console.log('Socket client connected');

        socket.on('disconnect', function () {
            socketBusiness.socketDisconnected(socket);
            console.log('Socket client disconnected.');
        });

        socket.on(appConstants.C2S_REGISTER_USER, function (encryptedUserData) {
            var userData = decryptObject(socket, encryptedUserData);
            socketBusiness.registerUser(socket, userData.nickname, userData.username, userData.password);
            console.log(userData);
        });

        socket.on(appConstants.C2S_LOG_IN_USER, function (encryptedCredentials) {
            var credentials = decryptObject(socket, encryptedCredentials);
            socketBusiness.loginUser(socket, credentials.username, credentials.password);
            console.log(credentials);
        })

        socket.on(appConstants.C2S_LOG_OUT_USER, function () {
            socketBusiness.logoutUser(socket);
        });

        socket.on(appConstants.C2S_GET_CONTACT_LIST, function () {
            socketBusiness.sendContactList(socket);
        });

        socket.on(appConstants.C2S_GET_CHAT_HISTORY, function (encryptedContactUserId) {
            var contactUserId = decryptObject(socket, encryptedContactUserId);
            socketBusiness.sendFullHistory(socket, contactUserId);
        });

        socket.on(appConstants.C2S_CHAT_MESSAGE, function (encryptedMessage) {
            var message = decryptObject(socket, encryptedMessage);
            console.log(message);
            socketBusiness.handleChatMessageReceived(
                socket,
                message.sender,
                message.recipient,
                message.message
            );
        });

        socket.on(appConstants.C2S_SENDING_KEY, function (encryptedAesKey) {
            socketBusiness.registerAesKey(socket, encryptedAesKey);
        });

    });

    console.log('socket-setup.js executed.');
};
