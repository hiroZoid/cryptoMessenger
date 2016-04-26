"use strict";

function ChatHistory(parentController, parentElement) {
    var view = document.createElement('div');
    view.className = 'chatHistory';

    var data = [];
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
            div.className = (data[i].who == 'me') ? 'chatTextMe' : 'chatTextThey';
            view.appendChild(div);
        }
        view.scrollTop = view.scrollHeight;
    }
}
