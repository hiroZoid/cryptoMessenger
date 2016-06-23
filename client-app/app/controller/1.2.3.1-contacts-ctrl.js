"use strict";

define(function (require) {

    var ContactsView = require('text!/app/view/1.2.3.1-contacts-view.html!strip');
    var ContactView = require('text!/app/view/1.2.3.1.1-contact-view.html!strip');
    var AbstractCtrl = require('./abstract-ctrl.js');

    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');
    var chatProxy = require('/app/core/chat-proxy.js');
    var appProxy = require('/app/core/app-proxy.js');

    return function ContactsCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, ContactsView]);

        this.render = function () {
            console.log('ContactList.render()');
            this.removeAllChildrenFrom(this.getDescendant('cm-contacts'));

            if (chatProxy.getContactList() !== null) {
                chatProxy.getContactList().forEach((function (contact) {

                    var contactDiv = this.createView(ContactView);
                    var contactAvatar = contactDiv.getElementsByClassName('cm-avatar')[0];
                    var contactName = contactDiv.getElementsByClassName('cm-contact-name')[0];

                    contactAvatar.src = '/img/' + contact.avatar;
                    contactAvatar.onerror = function () {
                        this.src = appProxy.getDefaultAvatarUrl();
                    };

                    contactName.textContent = contact.nickname;

                    contactDiv.addEventListener("click", (function () {
                        facade.sendNotification(appConstants.SELECT_CONTACT, this.contact);
                    }).bind({ contact: contact }));

                    this.getDescendant('cm-contacts').appendChild(contactDiv);

                }).bind(this));
            }

            this.showView();
        };

        facade.subscribe(appConstants.CONTACT_LIST_RECEIVED, function () {
            if (this.view.parentNode === this.parentElement) {
                this.render();
            }
        }.bind(this));

        facade.subscribe(appConstants.C2S_LOG_OUT_USER, function () {
            this.removeAllChildrenFrom(this.getDescendant('cm-contacts'));
        }.bind(this));

        // =====================================================================
    };
});
