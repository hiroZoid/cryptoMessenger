"use strict";

module.exports.setup = function (httpServer) {

    let io = require('socket.io').listen(httpServer);
    let socketBusiness = require('../business/socket-business.js');
    let appConstants = require('../app-constants.js');

    io.on('connection', function (socket) {

        socketBusiness.userConnected(socket);
        console.log('Socket client connected');
        
        socket.on('disconnect', function () {
            socketBusiness.userDisconnected(socket);
            console.log('Socket client disconnected.');
        });

        socket.on(appConstants.SOCKET_MESSAGE, function (message) {
            console.log(message);
        })

        socket.on(appConstants.SOCKET_LOG_IN, function (credentials) {
            socketBusiness.loginUser(socket, credentials.username, credentials.password);
            console.log(credentials);
        })

        socket.on(appConstants.SOCKET_REGISTER_USER, function (userData) {
            socketBusiness.registerUser(socket, userData.nickname, userData.username, userData.password);
            console.log(userData);
        })
    });

    console.log('socket-setup.js executed.');
};
