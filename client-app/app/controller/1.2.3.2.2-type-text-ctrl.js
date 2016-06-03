"use strict";

define(function (require) {

    var TypeTextView = require('text!/app/view/1.2.3.2.2-type-text-view.html!strip');
    var AbstractCtrl = require('./abstract-ctrl.js');

    var facade = require('/app/core/facade.js');
    var appProxy = require('/app/core/app-proxy.js');
    var chatProxy = require('/app/core/chat-proxy.js');
    var appConstants = require('/app-constants.js');

    return function TextTextCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, TypeTextView]);

        this.getDescendant('cm-type-text').disabled = true;
        this.getDescendant('cm-type-text').addEventListener('keydown', function (e) {
            if (e.keyCode == 13 && e.target.value.length > 0) {
                facade.sendNotification(appConstants.C2S_CHAT_MESSAGE, {
                    profile: appProxy.getPlainTextProfileId(),
                    sender: appProxy.getCurrentUserId(),
                    recipient: chatProxy.getRecipientUserId(),
                    message: e.target.value
                });
                e.target.value = '';
            }
        });

        facade.subscribe(appConstants.CHAT_HISTORY_UPDATED, (function () {
            if (chatProxy.getRecipientUser() !== null) {
                this.getDescendant('cm-type-text').disabled = false;
                this.getDescendant('cm-type-text').focus();
            } else {
                this.getDescendant('cm-type-text').disabled = true;
            }
        }).bind(this));

        // =====================================================================
    };
});
