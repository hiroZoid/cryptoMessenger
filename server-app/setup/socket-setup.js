"use strict";

var socketProxy = require('../proxy/socket-proxy.js');
var io;

module.exports.setup = function (httpServer) {

    io = require('socket.io').listen(httpServer);

    io.on('connection', function (socket) {

        socketProxy.userConnected(socket);
        console.log('Socket client connected');

        socket.on('disconnect', function () {
            socketProxy.userDisconnected(socket);
            console.log('Socket client disconnected.');
        });

        socket.on('message', function (message) {
            console.log(message);
        })

        socket.on('login', function (credentials) {
            socketProxy.loginUser(socket, credentials.username, credentials.password);
            console.log(credentials);
        })
        
        socket.on('signup', function (credentials) {
            socketProxy.loginUser(socket, credentials.username, credentials.password);
            console.log(credentials);
        })
    });

    console.log('socket-setup.js executed.');
};
