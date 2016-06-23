"use strict";

define(function (require) {

    var AbstractCtrl = require('./abstract-ctrl.js');
    var NavBarView = require('text!/app/view/1.1-nav-bar-view.html!strip');

    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');
    var appProxy = require('/app/core/app-proxy.js');

    return function NavBarCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, NavBarView]);

        var registerTab = this.getDescendant('register-tab');
        var logInTab = this.getDescendant('log-in-tab');
        var chatTab = this.getDescendant('chat-tab');
        var logOutTab = this.getDescendant('log-out-tab');
        var editProfileTab = this.getDescendant('edit-profile-tab');
        var avatarImg = this.getDescendant('cm-avatar');
        var nickname = this.getDescendant('cm-nickname');

        avatarImg.src = appProxy.getDefaultAvatarUrl();
        avatarImg.onerror = function () {
            this.src = appProxy.getDefaultAvatarUrl();
        };

        function setNotLoggedState() {
            registerTab.style.display = '';
            logInTab.style.display = '';
            chatTab.style.display = 'none';
            logOutTab.style.display = 'none';
            editProfileTab.style.display = 'none';
            avatarImg.src = appProxy.getDefaultAvatarUrl();
            nickname.textContent = '';
        }

        function setLoggedState() {
            registerTab.style.display = 'none';
            logInTab.style.display = 'none';
            chatTab.style.display = '';
            logOutTab.style.display = '';
            editProfileTab.style.display = '';
            console.log('appProxy.getCurrentUser()', appProxy.getCurrentUser());
            avatarImg.src = '/img/' + appProxy.getCurrentUser().avatar;
            nickname.textContent = appProxy.getCurrentUser().nickname;
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

        editProfileTab.onclick = function () {
            facade.sendNotification(appConstants.NAVBAR_ITEM_CLICKED, appConstants.EDIT_PROFILE_TAB);
        };

        logOutTab.onclick = function () {
            facade.sendNotification(appConstants.C2S_LOG_OUT_USER);
            setNotLoggedState();
        };

        setNotLoggedState();

        facade.subscribe(appConstants.S2C_USER_LOGGED_IN, function () {
            setLoggedState();
        });

        // =====================================================================
    };
});
