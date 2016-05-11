"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');

    var facade = require('../facade.js');
    var appProxy = require('../appProxy.js');
    var chatProxy = require('../chatProxy.js');
    var appConstants = require('/app-constants');

    return function TextInput(parentController, parentElement) {
        // =====================================================================

        var view = document.createElement('input');
        view.setAttribute('name', this.constructor.name);
        view.type = 'text';
        view.style.width = '100%';
        view.style.height = '2em';
        view.style.padding = '0 0.25em';

        view.addEventListener('keydown', (function (e) {
            console.log('TextInput.view.onKeyDown()');
            if (e.keyCode == 13 && e.target.value.length > 0) {
                facade.sendNotification(appConstants.C2S_CHAT_MESSAGE, {
                    profile: appProxy.getPlainTextProfileId(),
                    sender: appProxy.getCurrentUserId(),
                    recipient: chatProxy.getRecipientUserId(),
                    message: e.target.value
                });
                e.target.value = '';
            }
        }).bind(this));

        this.getStyleHeight = function () {
            return view.style.height;
        };

        var data = null;
        this.setData = function (newData) {
            console.log('TextInput.setData()');
            data = newData;
        };

        this.render = function () {
            console.log('TextInput.render()');
            AbstractView.append(view, parentElement);
            //view.disabled = (data == null);
            if (!view.disabled) {
                view.focus();
            }
        };

        // =====================================================================
    };
});
