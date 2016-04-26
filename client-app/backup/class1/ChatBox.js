"use strict";

function ChatBox(parentController, parentElement) {
    var view = document.createElement('div');
    view.className = 'chatBox';

    var title = document.createElement('div');
    title.className = 'boxTitle';
    view.appendChild(title);

    var children = {
        chatHistory: new ChatHistory(this, view),
        textInput: new TextInput(this, view)
    }

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
        while (title.firstChild) {
            title.removeChild(title.firstChild);
        }
        if (data.name) {
            var img = document.createElement('img');
            img.src = data.avatar;
            img.className = 'avatar';

            var h2 = document.createElement('h2');
            h2.textContent = data.name;
            h2.style.float = 'right';

            title.appendChild(img)
            title.appendChild(h2);
        }
        children.chatHistory.render();
        children.textInput.render();
    }

    this.renderChatHistory = function () {
        console.log('ChatBox.renderChatHistory()');
        children.chatHistory.render();
    }
}
