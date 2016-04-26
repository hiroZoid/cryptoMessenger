"use strict";

define(function (require) {

    var AbstractController = require('./AbstractController');
    var BoxTitle = require('./BoxTitle');
    var ChatHistory = require('./ChatHistory');
    var TextInput = require('./TextInput');

    return function ChatBox(parentController, parentElement) {
        // =====================================================================
        
        AbstractController.call(this);

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

        var data = [];
        this.setData = function (newData) {
            console.log('ChatBox.setData()', newData);
            data = newData;
            children.chatHistory.setData(data.chatHistory);
            children.textInput.setData(data);
        };

        this.render = function () {
            console.log('ChatBox.render()');
            if (view.parentNode !== parentElement) {
                parentElement.appendChild(view);
            }
            children.boxTitle.clear();
            if (data.name) {
                var img = document.createElement('img');
                img.src = data.avatar;
                img.className = 'avatar';

                var h2 = document.createElement('h2');
                h2.textContent = data.name;
                h2.style.float = 'right';

                children.boxTitle.appendChild(img);
                children.boxTitle.appendChild(h2);
            }
            this.renderAll(children);
        };

        this.chatHistoryUpdated = function () {
            console.log('ChatBox.chatHistoryUpdated()');
            children.chatHistory.render();
        };
        
        // =====================================================================
    };
});
