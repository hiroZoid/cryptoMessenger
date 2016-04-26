"use strict";

function TextInput(parentController, parentElement) {
    var view = document.createElement('input');
    view.type = 'text';
    view.className = 'textInput';
    view.owner = this;

    view.addEventListener('keydown', function (e) {
        console.log('TextInput.view.onKeyDown()');
        if (e.keyCode == 13 && e.target.value.length > 0) {
            data.chatHistory.push({who: 'me', text: e.target.value});
            e.target.value = '';
            parentController.renderChatHistory();
        }
    });

    var data = null;
    this.setData = function (newData) {
        console.log('TextInput.setData()');
        data = newData;
    };

    this.render = function () {
        console.log('TextInput.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        view.disabled = (data == null);
        if (!view.disabled) {
            view.focus();
        }
    }
}
