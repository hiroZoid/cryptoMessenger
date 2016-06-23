"use strict";

define(function (require) {

    var LogInView = require('text!/app/view/1.2.2-log-in-view.html!strip');

    var AbstractCtrl = require('./abstract-ctrl.js');
    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');

    return function LogInCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, LogInView]);

        var usernameInput = this.getDescendant('cm-username');
        var passwordInput = this.getDescendant('cm-password');

        this.getDescendant('cm-submit').onclick = function () {
            if (usernameInput.value == '' || passwordInput.value == '') {
                alert('Fill username and password!');
            } else {
                facade.sendNotification(appConstants.C2S_LOG_IN_USER, {
                    username: usernameInput.value,
                    password: passwordInput.value
                });
            }
            return false;
        }

        facade.subscribe(appConstants.S2C_INVALID_CREDENTIALS, function () {
            alert('Invalid credentials!');
        });

        facade.subscribe(appConstants.S2C_USER_LOGGED_IN, function () {
            usernameInput.value = '';
            passwordInput.value = '';
        });

        // =====================================================================
    };
});
