"use strict";

module.exports.setup = function (httpServer) {

    let io = require('socket.io').listen(httpServer);
    let socketProxy = require('../proxy/socket-proxy.js');
    let appConstants = require('../app-constants.js');

    io.on('connection', function (socket) {

        socketProxy.userConnected(socket);
        console.log('Socket client connected');

        socket.on('disconnect', function () {
            socketProxy.userDisconnected(socket);
            console.log('Socket client disconnected.');
        });

        socket.on(appConstants.SOCKET_MESSAGE, function (message) {
            console.log(message);
        })

        socket.on(appConstants.SOCKET_LOG_IN, function (credentials) {
            socketProxy.loginUser(socket, credentials.username, credentials.password);
            console.log(credentials);
        })

        socket.on(appConstants.SOCKET_SIGN_UP, function (credentials) {
            //socketProxy.loginUser(socket, credentials.username, credentials.password);
            console.log(credentials);
        })
    });

    console.log('socket-setup.js executed.');
};
