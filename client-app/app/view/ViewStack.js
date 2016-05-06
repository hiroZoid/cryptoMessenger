"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');
    var ChatView = require('./ChatView');
    var LogInView = require('./LogInView');
    var RegisterView = require('./RegisterView');

    var facade = require('../facade.js');
    var appConstants = require('/app-constants');

    return function ViewStack(parentController, parentElement) {
        // =====================================================================

        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100%';

        this.subtractFromHeight = function (value) {
            console.log('ViewStack.subtractFromHeight()');
            view.style.height = 'calc(100% - ' + value + ')';
        };

        var children = {
            registerView: new RegisterView(this, view),
            logInView: new LogInView(this, view),
            chatView: new ChatView(this, view)
        };

        this.selectedChildren = children.logInView;

        facade.subscribe(appConstants.NAVBAR_ITEM_CLICKED, (function (className) {
            switch (className) {
                case 'RegisterView':
                    this.selectedChildren = children.registerView;
                    break;
                case 'LogInView':
                    this.selectedChildren = children.logInView;
                    break;
                case 'ChatView':
                    this.selectedChildren = children.chatView;
                    break;
                case 'LogOut':
                    break;
            };
            this.render();
        }).bind(this));

        this.render = function () {
            console.log('ViewStack.render()');
            AbstractView.append(view, parentElement);
            for (var key in children) {
                children[key].remove();
            }
            this.selectedChildren.render();
        };

        // =====================================================================
    };
});
