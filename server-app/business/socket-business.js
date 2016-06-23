"use strict";

var userDao = require('../dao/user-dao.js');
var messageDao = require('../dao/message-dao.js');
var contactDao = require('../dao/contact-dao.js');
var appConstants = require('../app-constants.js');
var keyBusiness = require('./key-business.js')

// hashmap to sockets by socket.id
var socketsById = {};

// hashmap to sockets by user._id
var socketsByUserId = {};

function encryptAndEmit(socket, notification, message) {
    if (message === undefined) {
        socket.emit(notification);
    } else {
        var plaintext = JSON.stringify(message);
        var encrypted = keyBusiness.aesEncrypt(plaintext, socketsById[socket.id].aesKey);
        socket.emit(notification, encrypted);
    }
}


var emitDataBaseError = function (socket, msg, err) {
    encryptAndEmit(socket, appConstants.S2C_DATABASE_ERROR, msg + '\n\n' + err);
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
                    encryptAndEmit(socket, appConstants.S2C_INVALID_CREDENTIALS, null);
                } else {
                    console.log('user retrieved', user);
                    socketsById[socket.id].user = user;
                    socketsByUserId[user._id] = socket;
                    encryptAndEmit(socket, appConstants.S2C_USER_LOGGED_IN, user);
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
                    encryptAndEmit(socket, appConstants.S2C_USERNAME_EXISTS, null);
                } else {
                    encryptAndEmit(socket, appConstants.S2C_USER_REGISTERED, user);
                }
            })
            .catch(emitDataBaseError.bind(null, socket, 'Could not register user.'));
    },

    sendContactList: function (socket) {
        userDao.retrieveAllExcept(socketsById[socket.id].user._id)
            .then(function (contactList) {
                encryptAndEmit(socket, appConstants.S2C_SEND_CONTACT_LIST, contactList);
                console.log('contactList retrieved');
            })
            .catch(emitDataBaseError.bind(null, socket, 'Could not get contact list.'));

        messageDao.getConversationList(socketsById[socket.id].user._id)
            .then(function (x) {
                console.log(x);
            }).catch(function (err) {
                console.log(err);
            });
    },

    sendFullHistory: function (socket, contactUserId) {
        messageDao.getFullHistory(socketsById[socket.id].user._id, contactUserId)
            .then(function (history) {
                encryptAndEmit(socket, appConstants.S2C_SEND_CHAT_HISTORY, {
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
                encryptAndEmit(socket,
                    appConstants.S2C_CHAT_MESSAGE,
                    chatMessage
                );
                // Send the message to recipient if logged
                if (socketsByUserId[chatMessage.recipient] !== undefined) {
                    encryptAndEmit(
                        socketsByUserId[chatMessage.recipient],
                        appConstants.S2C_CHAT_MESSAGE,
                        chatMessage
                    );
                }
                console.log(chatMessage);
            })
            .catch(emitDataBaseError.bind(null, socket, 'Could not deliver message.'));
    },

    registerAesKey: function (socket, encryptedAesKey) {
        socketsById[socket.id].aesKey = keyBusiness.privateKeyDecrypt(encryptedAesKey);
        console.log('Decrypted key:', socketsById[socket.id].aesKey);
        encryptAndEmit(socket, appConstants.S2C_KEY_RECEIVED);
    },

    getAesKey: function (socket) {
        return socketsById[socket.id].aesKey;
    }

};