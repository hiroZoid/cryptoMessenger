"use strict";

module.exports = function (httpServer) {

    var io = require('socket.io').listen(httpServer);
    
    io.on('connection', function (socket) {
        console.log('Socket client connected');
        
        socket.on('disconnect', function (transportCloseMessage) {
            console.log('Socket client disconnected.');
            console.log(transportCloseMessage);            
        });
        
        socket.on('message', function (message) {
            console.log(message);
        })
    });
    
    console.log('socket-setup.js executed.');
};