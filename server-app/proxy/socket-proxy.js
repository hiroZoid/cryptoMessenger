"use strict";

var userDao = require('../dao/user-dao.js');
var socketSetup = require('../setup/socket-setup.js');
var users = {};

module.exports.userConnected = function (socket) {
    users[socket.id] = {};
    console.log(users);
};

module.exports.userDisconnected = function (socket) {
    delete users[socket.id];
    console.log(users);
};

module.exports.isUserLogged = function (socket) {
    return users[socket.id] != undefided;
};

module.exports.loginUser = function (socket, username, password) {
    userDao.retrieve(username, password).then(function (user) {
        if (user == null) {
            socket.emit('invalidCredentials', null);
        } else {
            console.log('user retrieved', user);
            users[socket.id].user = user;
            userDao.retrieveAll().then(function (contactList) {
                socket.emit('contactList', contactList);
                console.log('contactList retrieved');
            });
        }
        console.log(users);
    }).catch(function (err) {
        console.log('user not retrieved');
    });
    
};

