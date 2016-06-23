"use strict";

define(function (require) {

    var HistoryView = require('text!/app/view/1.2.3.2.1-history-view.html!strip');
    var BalloonMeView = require('text!/app/view/1.2.3.2.1.1-balloon-me-view.html!strip');
    var BalloonTheyView = require('text!/app/view/1.2.3.2.1.2-balloon-they-view.html!strip');

    var AbstractCtrl = require('./abstract-ctrl.js');

    var facade = require('/app/core/facade.js');
    var chatProxy = require('/app/core/chat-proxy.js');
    var appProxy = require('/app/core/app-proxy.js');
    var appConstants = require('/app-constants.js');

    return function HistoryCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, HistoryView]);

        var balloonMe = this.createView(BalloonMeView);
        var balloonThey = this.createView(BalloonTheyView);

        this.render = function () {
            this.removeAllChildrenFrom(this.getDescendant('cm-content'));

            if (chatProxy.getRecipientUser() !== null) {
                chatProxy.getHistoryForRecipientUser().forEach(function (msg) {
                    var ballon = null;
                    if (msg.sender == appProxy.getCurrentUserId()) {
                        balloonMe.textContent = msg.message;
                        ballon = balloonMe.cloneNode(true);
                    } else {
                        balloonThey.textContent = msg.message;
                        ballon = balloonThey.cloneNode(true);
                    }
                    this.getDescendant('cm-content').appendChild(ballon);
                }.bind(this));

                this.getDescendant('cm-content').scrollTop = this.getDescendant('cm-content').scrollHeight;
            }

            this.showView();
        }

        facade.subscribe(appConstants.CHAT_HISTORY_UPDATED, (function (recipientUserId) {
            console.log('recipientUserId: ', recipientUserId);
            console.log('chatProxy.getRecipientUserId(): ', chatProxy.getRecipientUserId());
            if (recipientUserId !== undefined
                && chatProxy.getRecipientUser() !== null
                && chatProxy.getRecipientUserId() === recipientUserId) {
                this.render();
            }
        }).bind(this));

        facade.subscribe(appConstants.C2S_LOG_OUT_USER, function () {
            this.removeAllChildrenFrom(this.getDescendant('cm-content'));
        }.bind(this));

        // =====================================================================
    };
});