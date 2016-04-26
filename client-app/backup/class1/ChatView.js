"use strict";

function ChatView(parentController, parentElement) {
    var view = document.createElement('div');
    view.className = 'navigatorContent';

    var contactBox = document.createElement('div');
    contactBox.className = 'contactBox';
    view.appendChild(contactBox)

    var contactBoxTitle = document.createElement('div');
    contactBoxTitle.className = 'boxTitle';
    contactBoxTitle.innerHTML = "<h2>Contatos</h2>";
    contactBox.appendChild(contactBoxTitle);

    var children = {
        contactList: new ContactList(this, contactBox),
        chatBox: new ChatBox(this, view)
    };

    var data = null;
    this.setData = function (newData) {
        console.log('ChatView.setData()');
        data = newData;
        children.contactList.setData(data);
    };

    this.setChatBoxData = function (newData) {
        console.log('ChatView.setChatBoxData()');
        children.chatBox.setData(newData);
        children.chatBox.render();
    };

    this.render = function () {
        console.log('ChatView.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        children.contactList.render();
        children.chatBox.render();
    };
}
