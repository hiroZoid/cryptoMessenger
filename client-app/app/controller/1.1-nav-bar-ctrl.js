"use strict";

define(function (require) {

    var AbstractCtrl = require('./abstract-ctrl.js');
    var NavBarView = require('text!/app/view/1.1-nav-bar-view.html!strip');

    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');

    return function NavBarCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, NavBarView]);

        var registerTab = this.getDescendant('register-tab');
        var logInTab = this.getDescendant('log-in-tab');
        var chatTab = this.getDescendant('chat-tab');
        var logOutTab = this.getDescendant('log-out-tab');

        function setNotLoggedState() {
            registerTab.style.display = '';
            logInTab.style.display = '';
            chatTab.style.display = 'none';
            logOutTab.style.display = 'none';
        }

        function setLoggedState() {
            registerTab.style.display = 'none';
            logInTab.style.display = 'none';
            chatTab.style.display = '';
            logOutTab.style.display = '';
        }

        registerTab.onclick = function () {
            facade.sendNotification(appConstants.NAVBAR_ITEM_CLICKED, appConstants.REGISTER_TAB);
        };

        logInTab.onclick = function () {
            facade.sendNotification(appConstants.NAVBAR_ITEM_CLICKED, appConstants.LOG_IN_TAB);
        };

        chatTab.onclick = function () {
            facade.sendNotification(appConstants.NAVBAR_ITEM_CLICKED, appConstants.CHAT_TAB);
        };

        logOutTab.onclick = function () {
            facade.sendNotification(appConstants.NAVBAR_ITEM_CLICKED, appConstants.LOG_OUT_TAB);
        };

        setNotLoggedState();
        
        facade.subscribe(appConstants.S2C_USER_LOGGED_IN, function () {
            setLoggedState();
        });

        // =====================================================================
    };
});
