"use strict";

define(function (require) {

    var ConversationView = require('text!/app/view/1.2.3.2-conversation-view.html!strip');

    var AbstractCtrl = require('./abstract-ctrl.js');
    var HistoryCtrl = require('./1.2.3.2.1-history-ctrl.js');
    var TypeTextCtrl = require('./1.2.3.2.2-type-text-ctrl.js');

    var facade = require('/app/core/facade.js');
    var chatProxy = require('/app/core/chat-proxy.js');
    var appProxy = require('/app/core/app-proxy.js');
    var appConstants = require('/app-constants.js');

    return function ConversationCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, ConversationView]);

        var recipientName = this.view.getElementsByClassName('cm-contact-name')[0];
        var avatar = this.view.getElementsByClassName('cm-avatar')[0];
        avatar.onerror = function () {
            this.src = appProxy.getDefaultAvatarUrl();
        };

        this.children = {
            chatHistory: new HistoryCtrl(this.getDescendant('cm-history')),
            textInput: new TypeTextCtrl(this.getDescendant('cm-type-text'))
        };

        facade.subscribe(appConstants.CHAT_HISTORY_UPDATED, function () {
            if (chatProxy.getRecipientUser() !== null) {
                avatar.src = '/img/' + chatProxy.getRecipientUser().avatar;
                recipientName.textContent = chatProxy.getRecipientUser().nickname;
            } else {
                avatar.src = appProxy.getDefaultAvatarUrl();
                recipientName.textContent = '';
            }
        });

        function setDefault() {
            avatar.src = appProxy.getDefaultAvatarUrl();
            recipientName.textContent = '';
        }

        facade.subscribe(appConstants.C2S_LOG_OUT_USER, setDefault);

        setDefault();

        // =====================================================================
    };
});
