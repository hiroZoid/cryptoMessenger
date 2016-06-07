"use strict";
define(function (require) {

    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');
    var appProxy = require('/app/core/app-proxy.js');

    /*
        chatData = {
            contactUser1._id: {
                contact: contactUser1,
                history: [message1, message2, ...]
            }
            contactUser2._id: ...
        }
    */
    var chatData = {};
    /*
        contactList = [contactUser1, contactUser2, ...]
    */
    var contactList = null;
    var recipientUser = null;

    facade.subscribe(appConstants.SELECT_CONTACT, function (contactUser) {
        recipientUser = contactUser;
        if (chatData[contactUser._id].history === undefined) {
            facade.sendNotification(appConstants.C2S_GET_CHAT_HISTORY, contactUser._id);
        } else {
            facade.sendNotification(appConstants.CHAT_HISTORY_UPDATED, contactUser._id);
        }
    });

    facade.subscribe(appConstants.S2C_SEND_CONTACT_LIST, function (contacts) {
        contactList = contacts;
        contactList.forEach(function (contact) {
            chatData[contact._id] = { contact: contact };
        });
        facade.sendNotification(appConstants.CONTACT_LIST_RECEIVED);
        console.log(chatData);
    });

    facade.subscribe(appConstants.S2C_CHAT_MESSAGE, function (msg) {
        var contactUserId = (msg.sender._id == appProxy.getCurrentUserId() ? msg.recipient : msg.sender);
        /*
        if (chatData[contactUserId].history === undefined) {
            chatData[contactUserId].history = [];
        }
        */
        chatData[contactUserId].history.push(msg);
        facade.sendNotification(appConstants.CHAT_HISTORY_UPDATED, contactUserId);
    });

    facade.subscribe(appConstants.S2C_SEND_CHAT_HISTORY, function (contactHistory) {
        chatData[contactHistory.contactUserId].history = contactHistory.history;
        facade.sendNotification(appConstants.CHAT_HISTORY_UPDATED, contactHistory.contactUserId);
        console.log(contactHistory.history);
    });

    facade.subscribe(appConstants.C2S_LOG_OUT_USER, function () {
        chatData = {};
        contactList = null;
        recipientUser = null;
    });

    console.log('chat-proxy.js required');

    return {

        getContactList: function () {
            return contactList;
        },

        getRecipientUser: function () {
            return recipientUser;
        },

        getRecipientUserId: function () {
            return recipientUser._id;
        },

        getHistoryForRecipientUser: function () {
            return chatData[recipientUser._id].history;
        },

    }

});