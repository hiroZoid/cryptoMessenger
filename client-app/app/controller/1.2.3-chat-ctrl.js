"use strict";

define(function (require) {

    var ChatView = require('text!/app/view/1.2.3-chat-view.html!strip');

    var AbstractCtrl = require('./abstract-ctrl.js');
    var ContactsCtrl = require('./1.2.3.1-contacts-ctrl.js');
    var ConversationCtrl = require('./1.2.3.2-conversation-ctrl.js');

    return function ChatCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, ChatView]);

        this.children = {
            contactsCtrl: new ContactsCtrl(this.getDescendant('cm-contacts')),
            conversationCtrl: new ConversationCtrl(this.getDescendant('cm-conversation'))
        };

        //this.children.boxTitle.setInnerHTML("<h2 style='width: 100%; text-align: center'>Contatos</h2>");
        //this.children.contactList.setStyleHeight('calc(100% - ' + this.children.boxTitle.getStyleHeight() + ')');

        // =====================================================================
    };
});