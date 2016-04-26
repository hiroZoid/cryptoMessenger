"use strict";

define(function (require) {

    var AbstractController = require('./AbstractController');

    return function ChatHistory(parentController, parentElement) {
        // =====================================================================
        
        AbstractController.call(this);

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
            if (view.parentNode !== parentElement) {
                parentElement.appendChild(view);
            }
            while (view.firstChild) {
                view.removeChild(view.firstChild);
            }
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

        // =====================================================================
    };
});