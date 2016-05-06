"use strict";

var userDao = require('../dao/user-dao.js');
var messageDao = require('../dao/message-dao.js');
var appConstants = require('../app-constants.js');
var profileBusiness = require('./profile-business.js');

// hashmap to sockets by socket.id
var sockets = {};

// hashmap to sockets by user._id
var users = {};

module.exports = {

    socketConnected: function (socket) {
        sockets[socket.id] = {};
        console.log(sockets);
    },

    socketDisconnected: function (socket) {
        if (sockets[socket.id].user !== undefined) {
            delete users[sockets[socket.id].user._id];
        }
        delete sockets[socket.id];
        console.log(sockets);
    },

    isSocketLogged: function (socket) {
        return sockets[socket.id] !== undefided;
    },

    loginUser: function (socket, username, password) {
        userDao.retrieve(username, password)
            .then(function (user) {
                if (user == null) {
                    socket.emit(appConstants.SOCKET_INVALID_CREDENTIALS, null);
                } else {
                    console.log('user retrieved', user);
                    sockets[socket.id].user = user;
                    users[user._id] = socket;
                    socket.emit(appConstants.SOCKET_USER_LOGGED, user);
                }
            })
            .catch(function (err) {
                socket.emit(appConstants.SOCKET_DATABASE_ERROR, 'Could not retrieve user.');
            });
    },

    logoutUser: function (socket) {
        delete sockets[socket.id].user;
        delete users[user._id];
    },

    registerUser: function (socket, nickname, username, password) {
        userDao.persist(nickname, username, password)
            .then(function (user) {
                sleep(1000);
                if (user == null) {
                    socket.emit(appConstants.SOCKET_USERNAME_EXISTS, null);
                } else {
                    socket.emit(appConstants.SOCKET_USER_REGISTERED, user);
                }
            })
            .catch(function (err) {
                socket.emit(appConstants.SOCKET_DATABASE_ERROR, 'Could not register user.');
            });
    },

    sendContactList: function (socket) {
        userDao.retrieveAll().then(function (contactList) {
            socket.emit(appConstants.SOCKET_SENDING_CONTACT_LIST, contactList);
            console.log('contactList retrieved');
        });
    },

    sendPlaintextProfile: function (socket) {
        socket.emit(appConstants.SOCKET_SEND_PLAINTEXT_PROFILE, profileBusiness.getPlaintextProfile());
    },

    handleChatMessageReceived: function (socket, profile, sender, recipient, message) {
        messageDao.persist(profile, sender, recipient, message)
            .then(function (chatMsg) {
                console.log(chatMsg);
            })
            .catch(function (err) {
                socket.emit(appConstants.SOCKET_DATABASE_ERROR, 'Could not deliver message.\n' + err);
            });
    },


};