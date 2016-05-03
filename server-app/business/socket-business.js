"use strict";

var userDao = require('../dao/user-dao.js');
var appConstants = require('../app-constants.js');

var users = {};

module.exports = {

    userConnected: function (socket) {
        users[socket.id] = {};
        console.log(users);
    },

    userDisconnected: function (socket) {
        delete users[socket.id];
        console.log(users);
    },

    isUserLogged: function (socket) {
        return users[socket.id] !== undefided;
    },

    loginUser: function (socket, username, password) {
        userDao.retrieve(username, password).then(function (user) {
            if (user == null) {
                socket.emit(appConstants.SOCKET_INVALID_CREDENTIALS, null);
            } else {
                console.log('user retrieved', user);
                users[socket.id].user = user;
                userDao.retrieveAll().then(function (contactList) {
                    socket.emit(appConstants.SOCKET_SENDING_CONTACT_LIST, contactList);
                    console.log('contactList retrieved');
                });
            }
            console.log(users);
        }).catch(function (err) {
            console.log('user not retrieved');
        });

    },

    registerUser: function (socket, nickname, username, password) {
        userDao.persist(nickname, username, password).then(function (user) {
            sleep(1000);
            if (user == null) {
                socket.emit(appConstants.SOCKET_USERNAME_EXISTS, null);
            } else {
                socket.emit(appConstants.SOCKET_USER_REGISTERED, user);
            }
        }).catch(function (err) {
            socket.emit(appConstants.SOCKET_DATABASE_ERROR, 'Could not register user.');
        });
    },
    
};