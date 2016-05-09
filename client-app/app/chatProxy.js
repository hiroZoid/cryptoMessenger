"use strict";
define(function (require) {

    var appConstants = require('/app-constants');
    var facade = require('./facade.js');

    var chatData = {};

    facade.subscribe(appConstants.S2C_CHAT_MESSAGE, (function (msg) {
        if (chatData[msg.sender] === undefined) {
            chatData[msg.sender] = [];
        }
        chatData[msg.sender].push(msg);
        facade.sendNotification(appConstants.CHAT_HISTORY_UPDATED, { sender: msg.sender });
    }).bind(this));

    facade.subscribe(appConstants.S2C_SEND_CHAT_HISTORY, (function (history) {
        chatData[msg.sender] = history;
        facade.sendNotification(appConstants.CHAT_HISTORY_UPDATED, { sender: msg.sender });
        console.log(history);
    }).bind(this));

    return {
        getHistoryFor: function (senderId) {
            return chatData[senderId];
        },

        requestHistoryFor: function (senderId) {

        },
    }

});