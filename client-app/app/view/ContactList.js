"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');
    var appConstants = require('/app-constants');
    
    var facade = require('../facade.js');
    var socket = require('../socket.js');

    return function ContactList(parentController, parentElement) {
        // =====================================================================
        
        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100%';
        view.style.overflow = 'auto';

        var data = [];

        this.setStyleHeight = function (height) {
            view.style.height = height;
        }

        this.setData = function (newData) {
            console.log('ContactList.setData()');
            data = newData;
        };

        this.render = function () {
            console.log('ContactList.render()');
            AbstractView.append(view, parentElement);
            AbstractView.removeAllChildrenFrom(view);

            for (var i = 0; i < data.length; i++) {
                var img = document.createElement('img');
                img.src = data[i].avatar;
                img.className = 'avatar';

                var p = document.createElement("p");
                p.textContent = data[i].nickname;

                var div = document.createElement("div");
                div.className = 'contact';
                div.appendChild(img);
                div.appendChild(p);
                div.data = data[i];
                div.addEventListener("click", function (e) {
                    console.log('ContactList.onContactClicked()');
                    facade.sendNotification(appConstants.CONTACT_CLICKED, this.data._id);
                });

                view.appendChild(div);
            }
        };

        facade.subscribe(appConstants.SOCKET_USER_LOGGED, (function () {
            socket.emit(appConstants.SOCKET_RETRIEVE_CONTACT_LIST);
        }).bind(this));
        
        facade.subscribe(appConstants.SOCKET_SENDING_CONTACT_LIST, (function (contactList) {
            this.setData(contactList);
        }).bind(this));
        
        // =====================================================================
    };
});
