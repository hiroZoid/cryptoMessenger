"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');

    var facade = require('../facade.js');
    var chatProxy = require('../chatProxy.js');
    var appProxy = require('../appProxy.js');
    var appConstants = require('/app-constants');

    return function ChatHistory(parentController, parentElement) {
        // =====================================================================

        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100%';
        view.style.overflow = 'auto';

        this.setStyleHeight = function (height) {
            view.style.height = height;
        }

        this.render = function () {
            console.log('ChatHistory.render()');
            AbstractView.append(view, parentElement);
            AbstractView.removeAllChildrenFrom(view);

            if (chatProxy.getRecipientUser() !== null) {
                chatProxy.getHistoryForRecipientUser().forEach(function (msg) {
                    var p = document.createElement("p");
                    p.textContent = msg.message;
                    var div = document.createElement("div");
                    div.appendChild(p);
                    div.className = 'chatText ' +
                        (msg.sender == appProxy.getCurrentUserId() ? 'chatTextMe' : 'chatTextThey');
                    view.appendChild(div);
                });
                
                view.scrollTop = view.scrollHeight;
            }
        }

        facade.subscribe(appConstants.CHAT_HISTORY_UPDATED, (function () {
            if (view.parentNode === parentElement) {
                this.render();
            }
        }).bind(this));

        // =====================================================================
    };
});