"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');
    var appConstants = require('/app-constants');

    var facade = require('../facade.js');
    var chatProxy = require('../chatProxy.js');
    var appProxy = require('../appProxy.js');

    return function ContactList(parentController, parentElement) {
        // =====================================================================

        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100%';
        view.style.overflow = 'auto';

        this.setStyleHeight = function (height) {
            view.style.height = height;
        }

        this.render = function () {
            console.log('ContactList.render()');
            AbstractView.append(view, parentElement);
            AbstractView.removeAllChildrenFrom(view);

            chatProxy.getContactList().forEach(function (contact) {
                
                var img = document.createElement('img');
                img.className = 'avatar';
                img.src = contact.avatar;
                img.onerror = function () {
                    this.src = appProxy.getDefaultAvatarUrl();
                };

                var p = document.createElement("p");
                p.textContent = contact.nickname;

                var div = document.createElement("div");
                div.className = 'contact';
                div.appendChild(img);
                div.appendChild(p);

                div.contact = contact;
                div.addEventListener("click", (function () {
                    facade.sendNotification(appConstants.SELECT_CONTACT, this.contact);
                }).bind(div));

                view.appendChild(div);
                
            });
        };

        facade.subscribe(appConstants.CONTACT_LIST_RECEIVED, (function () {
            if (view.parentNode === parentElement) {
                this.render();
            }
        }).bind(this));

        // =====================================================================
    };
});
