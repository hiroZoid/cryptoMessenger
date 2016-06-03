"use strict";

define(function (require) {

    var ViewStackView = require('text!/app/view/1.2-view-stack-view.html!strip');

    var AbstractCtrl = require('./abstract-ctrl.js');
    var RegisterCtrl = require('./1.2.1-register-ctrl.js');
    var LogInCtrl = require('./1.2.2-log-in-ctrl.js');
    var ChatCtrl = require('./1.2.3-chat-ctrl.js');

    var facade = require('/app/core/facade.js');
    var appConstants = require('/app-constants.js');

    return function ViewStackCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, ViewStackView]);

        this.children = {
            registerCtrl: new RegisterCtrl(this.getDescendant('cm-content')),
            logInCtrl: new LogInCtrl(this.getDescendant('cm-content')),
            chatCtrl: new ChatCtrl(this.getDescendant('cm-content'))
        };

        facade.subscribe(appConstants.NAVBAR_ITEM_CLICKED, (function (clickedTab) {
            switch (clickedTab) {
                case appConstants.REGISTER_TAB:
                    this.selectedChildCtrl = this.children.registerCtrl; break;
                case appConstants.LOG_IN_TAB:
                    this.selectedChildCtrl = this.children.logInCtrl; break;
                case appConstants.CHAT_TAB:
                    this.selectedChildCtrl = this.children.chatCtrl; break;
            };
            this.render();
        }).bind(this));

        this.selectedChildCtrl = this.children.logInCtrl;

        this.render = function () {
            this.showView();
            for (var key in this.children) {
                if (this.children[key] !== this.selectedChildCtrl) {
                    this.children[key].hideView();
                }
            }
            this.selectedChildCtrl.render();
        };

        facade.subscribe(appConstants.S2C_USER_LOGGED_IN, function () {
            this.selectedChildCtrl = this.children.chatCtrl;
            this.render();
        }.bind(this));

        // =====================================================================
    };
});
