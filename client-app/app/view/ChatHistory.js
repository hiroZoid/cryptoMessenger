"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');
    
    var facade = require('../facade.js');
    var socket = require('../socket.js');
    var appProxy = require('../appProxy.js');
    var appConstants = require('/app-constants');

    return function ChatHistory(parentController, parentElement) {
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
            console.log('ChatHistory.setData()');
            data = newData;
        };

        this.render = function () {
            console.log('ChatHistory.render()');
            AbstractView.append(view, parentElement);
            AbstractView.removeAllChildrenFrom(view);
            for (var i = 0; i < data.length; i++) {
                var p = document.createElement("p");
                p.textContent = data[i].text;
                var div = document.createElement("div");
                div.appendChild(p);
                div.className = 'chatText ' + ((data[i].who == 'me') ? 'chatTextMe' : 'chatTextThey');
                view.appendChild(div);
            }
            view.scrollTop = view.scrollHeight;
        }
        
        facade.subscribe(appConstants.CONTACT_CLICKED, (function (userId) {
            console.log(appConstants.CONTACT_CLICKED, userId);
        }).bind(this));
   
        // =====================================================================
    };
});