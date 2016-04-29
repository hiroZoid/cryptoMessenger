"use strict";

define(function (require) {

    var AbstractController = require('./AbstractController');
    var ChatView = require('./ChatView');
    var LogInView = require('./LogInView');

    return function ViewStack(parentController, parentElement) {
        // =====================================================================

        AbstractController.call(this);

        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100%';

        this.subtractFromHeight = function (value) {
            console.log('ViewStack.subtractFromHeight()');
            view.style.height = 'calc(100% - ' + value + ')';
        };

        var children = {
            logInView: new LogInView(this, view),
            chatView: new ChatView(this, view)
        };

        this.selectedChildren = children.logInView;

        this.menuItemClicked = function (clickedItem) {
            switch (clickedItem) {
                case 'logIn':
                    this.selectedChildren = children.logInView;
                    break;
                case 'logOut':
                    break;
                case 'chat':
                    this.selectedChildren = children.chatView;
                    break;
            }
        };

        this.socketProxy.subscribe('contactList', (function (contactList) {
            console.log(contactList);
            this.menuItemClicked('chat');
            this.render();
        }).bind(this));

        this.render = function () {
            console.log('ViewStack.render()');
            if (view.parentNode !== parentElement) {
                parentElement.appendChild(view);
            }
            this.selectedChildren.render();
            for (var key in children) {
                if (children[key] !== this.selectedChildren) {
                    children[key].remove();
                }
            }
        };

        // =====================================================================
    };
});
