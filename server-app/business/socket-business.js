"use strict";

var userDao = require('../dao/user-dao.js');
var messageDao = require('../dao/message-dao.js');
var appConstants = require('../app-constants.js');

// hashmap to sockets by socket.id
var socketsById = {};

// hashmap to sockets by user._id
var socketsByUserId = {};

var emitDataBaseError = function (socket, msg, err) {
    socket.emit(appConstants.S2C_DATABASE_ERROR, msg + '\n\n' + err);
};

module.exports = {

    socketConnected: function (socket) {
        socketsById[socket.id] = {};
        console.log(socketsById);
    },

    socketDisconnected: function (socket) {
        if (socketsById[socket.id].user !== undefined) {
            delete socketsByUserId[socketsById[socket.id].user._id];
        }
        delete socketsById[socket.id];
        console.log(socketsById);
    },

    isSocketLogged: function (socket) {
        return socketsById[socket.id] !== undefided;
    },

    loginUser: function (socket, username, password) {
        userDao.retrieve(username, password)
            .then(function (user) {
                if (user == null) {
                    socket.emit(appConstants.S2C_INVALID_CREDENTIALS, null);
                } else {
                    console.log('user retrieved', user);
                    socketsById[socket.id].user = user;
                    socketsByUserId[user._id] = socket;
                    socket.emit(appConstants.S2C_USER_LOGGED_IN, user);
                }
            })
            .catch(emitDataBaseError.bind(null, socket, 'Could not retrieve user.'));
    },

    logoutUser: function (socket) {
        delete socketsByUserId[socketsById[socket.id].user._id];
        delete socketsById[socket.id].user;
    },

    registerUser: function (socket, nickname, username, password) {
        userDao.persist(nickname, username, password)
            .then(function (user) {
                // sleep(1000);
                if (user == null) {
                    socket.emit(appConstants.S2C_USERNAME_EXISTS, null);
                } else {
                    socket.emit(appConstants.S2C_USER_REGISTERED, user);
                }
            })
            .catch(emitDataBaseError.bind(null, socket, 'Could not register user.'));
    },

    sendContactList: function (socket) {
        userDao.retrieveAllExcept(socketsById[socket.id].user._id)
            .then(function (contactList) {
                socket.emit(appConstants.S2C_SEND_CONTACT_LIST, contactList);
                console.log('contactList retrieved');
            })
            .catch(emitDataBaseError.bind(null, socket, 'Could not get contact list.'));
    },

    sendFullHistory: function (socket, contactUserId) {
        messageDao.getFullHistory(socketsById[socket.id].user._id, contactUserId)
            .then(function (history) {
                socket.emit(appConstants.S2C_SEND_CHAT_HISTORY, {
                    contactUserId: contactUserId,
                    history: history
                });
            })
            .catch(emitDataBaseError.bind(null, socket, 'Could not get chat history.'));
    },

    handleChatMessageReceived: function (socket, sender, recipient, message) {
        messageDao.persist(sender, recipient, message)
            .then(function (chatMessage) {
                // Send back the message to sender
                socket.emit(
                    appConstants.S2C_CHAT_MESSAGE,
                    chatMessage
                );
                // Send the message to recipient if logged
                if (socketsByUserId[chatMessage.recipient] !== undefined) {
                    socketsByUserId[chatMessage.recipient].emit(
                        appConstants.S2C_CHAT_MESSAGE,
                        chatMessage
                    );
                }
                console.log(chatMessage);
            })
            .catch(emitDataBaseError.bind(null, socket, 'Could not deliver message.'));
    },


};