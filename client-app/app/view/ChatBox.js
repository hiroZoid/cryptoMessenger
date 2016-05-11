"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');
    var BoxTitle = require('./BoxTitle');
    var ChatHistory = require('./ChatHistory');
    var TextInput = require('./TextInput');

    var facade = require('../facade.js');
    var chatProxy = require('../chatProxy.js');
    var appConstants = require('/app-constants');

    return function ChatBox(parentController, parentElement) {
        // =====================================================================

        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.className = 'fancyBox chatBox';

        var children = {
            boxTitle: new BoxTitle(this, view),
            chatHistory: new ChatHistory(this, view),
            textInput: new TextInput(this, view)
        };

        children.chatHistory.setStyleHeight(
            'calc(100% - ' + children.boxTitle.getStyleHeight() + ' - ' + children.textInput.getStyleHeight() + ')'
        );

        this.render = function () {
            console.log('ChatBox.render()');
            this.updateBoxTitle();
            AbstractView.append(view, parentElement);
            AbstractView.renderAll(children);
        };

        this.updateBoxTitle = function () {
            children.boxTitle.clear();

            if (chatProxy.getRecipientUser() !== null) {
                var img = document.createElement('img');
                img.src = chatProxy.getRecipientUser().avatar;
                img.className = 'avatar';

                var h2 = document.createElement('h2');
                h2.textContent = chatProxy.getRecipientUser().nickname;
                h2.style.float = 'right';

                children.boxTitle.appendChild(img);
                children.boxTitle.appendChild(h2);
            }
        };

        facade.subscribe(appConstants.SELECT_CONTACT, (function () {
            if (view.parentNode === parentElement) {
                this.updateBoxTitle();
            }
        }).bind(this));

        // =====================================================================
    };
});
