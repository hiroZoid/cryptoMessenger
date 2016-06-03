"use strict";

define(function (require) {

    var RegisterView = require('text!/app/view/1.2.1-register-view.html!strip');

    var AbstractCtrl = require('./abstract-ctrl.js');
    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');

    return function RegisterCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, RegisterView]);

        var nicknameInput = this.getDescendant('cm-nickname');
        var usernameInput = this.getDescendant('cm-username');
        var passwordInput = this.getDescendant('cm-password');

        this.getDescendant('cm-submit').onclick = (function () {
            if (nicknameInput.value == ''
                || usernameInput.value == ''
                || passwordInput.value == '') {
                alert('Fill all fields!');
            } else {
                facade.sendNotification(appConstants.C2S_REGISTER_USER, {
                    nickname: nicknameInput.value,
                    username: usernameInput.value,
                    password: passwordInput.value
                });
            }
        }).bind(this);

        facade.subscribe(appConstants.S2C_USER_REGISTERED, function () {
            nicknameInput.value = '';
            usernameInput.value = '';
            passwordInput.value = '';
            alert('User sucessfully created!\nNow you can login with your user.');
        });

        facade.subscribe(appConstants.S2C_USERNAME_EXISTS, function () {
            alert('Username already exists!\nChoose another.');
        });

        // =====================================================================
    };
});
