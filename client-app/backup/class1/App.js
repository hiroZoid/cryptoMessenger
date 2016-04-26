"use strict";

function App(parentElement) {
    var view = document.createElement('div');
    view.style.width = '100vw';
    view.style.height= '100vh';

    var children = {
        chatView: new ChatView(this, view)
    };

    var data = null;
    this.setData = function (newData) {
        console.log('App.setData()');
        data = newData;
        children.chatView.setData(data.chatData);
    };

    this.render = function () {
        console.log('App.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        children.chatView.render();
    };
}
