"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');
    var appConstants = require('/app-constants');
    
    var facade = require('../facade.js');

    return function ContactList(parentController, parentElement) {
        // =====================================================================
        
        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100%';
        view.style.overflow = 'auto';

        var contacts = [];

        this.setStyleHeight = function (height) {
            view.style.height = height;
        }

        this.setData = function (contactList) {
            console.log('ContactList.setData()');
            contacts = contactList;
        };

        this.render = function () {
            console.log('ContactList.render()');
            AbstractView.append(view, parentElement);
            AbstractView.removeAllChildrenFrom(view);

            for (var i = 0; i < contacts.length; i++) {
                var img = document.createElement('img');
                img.src = contacts[i].avatar;
                img.className = 'avatar';

                var p = document.createElement("p");
                p.textContent = contacts[i].nickname;

                var div = document.createElement("div");
                div.className = 'contact';
                div.appendChild(img);
                div.appendChild(p);
                
                div.contact = contacts[i];
                div.addEventListener("click", function () {
                    console.log('ContactList.onContactClicked()');
                    facade.sendNotification(appConstants.SELECT_CONTACT, this.contact);
                });

                view.appendChild(div);
            }
        };

        facade.subscribe(appConstants.S2C_SEND_CONTACT_LIST, (function (contactList) {
            this.setData(contactList);
        }).bind(this));
        
        // =====================================================================
    };
});
