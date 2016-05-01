"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');
    var BoxTitle = require('./BoxTitle');
    var ContactList = require('./ContactList');
    var ChatBox = require('./ChatBox');

    return function ChatView(parentController, parentElement) {
        // =====================================================================
        
        AbstractView.call(this);

        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100%';
        view.style.height = '100%';

        var contactBox = document.createElement('div');
        contactBox.className = 'fancyBox contactBox';
        view.appendChild(contactBox);

        var children = {
            boxTitle: new BoxTitle(this, contactBox),
            contactList: new ContactList(this, contactBox),
            chatBox: new ChatBox(this, view)
        };

        children.boxTitle.setInnerHTML("<h2 style='width: 100%; text-align: center'>Contatos</h2>");
        children.contactList.setStyleHeight('calc(100% - ' + children.boxTitle.getStyleHeight() + ')');


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

        this.setParentElement = function (newParentElement) {
            parentElement = newParentElement;
        }

        this.render = function () {
            console.log('ChatView.render()');
            if (view.parentNode !== parentElement) {
                parentElement.appendChild(view);
            }
            this.renderAll(children);
        };
        
        this.remove = function () {
            if (view.parentNode === parentElement) {
                parentElement.removeChild(view);
            }
        };

        // =====================================================================
    };
});