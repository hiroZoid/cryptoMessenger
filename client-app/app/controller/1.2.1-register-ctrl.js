"use strict";

define(function (require) {

    var RegisterView = require('text!/app/view/1.2.1-register-view.html!strip');
    var UploadAvatar = require('text!/app/view/upload-avatar.html!strip');

    var AbstractCtrl = require('./abstract-ctrl.js');
    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');
    var appProxy = require('/app/core/app-proxy.js');

    return function RegisterCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, RegisterView]);

        var nicknameInput = this.getDescendant('cm-nickname');
        var usernameInput = this.getDescendant('cm-username');
        var passwordInput = this.getDescendant('cm-password');
        var retypeInput = this.getDescendant('cm-retype');
        var avatarInput = this.getDescendant('cm-avatar');


        this.getDescendant('cm-form').onsubmit = (function () {

            if (nicknameInput.value == ''
                || usernameInput.value == ''
                || passwordInput.value == ''
                || retypeInput.value == '') {
                alert('Fill all fields!');
            } else if (passwordInput.value != retypeInput.value) {
                alert("Passwords don't match!");
            } else if (avatarInput.files.length == 1) {
                var iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                iframe.src = '/app/view/upload-avatar.html';
                iframe.onload = function () {
                    var form = iframe.contentWindow.document.getElementById('form');
                    var avatarInputClone = avatarInput.cloneNode(true);
                    var socketIdInput = document.createElement('input');
                    socketIdInput.setAttribute('name', 'socketId');
                    socketIdInput.setAttribute('type', 'text');
                    socketIdInput.setAttribute('value', appProxy.getSocketId());
                    form.appendChild(socketIdInput);
                    form.appendChild(avatarInputClone);
                    form.submit();
                }
            } else {
                sendRegisterUserNotification();
            }
            return false;
        }).bind(this);

        function sendRegisterUserNotification() {
            facade.sendNotification(appConstants.C2S_REGISTER_USER, {
                nickname: nicknameInput.value,
                username: usernameInput.value,
                password: passwordInput.value,
                avatar: avatarInput.value
            });
        }

        facade.subscribe(appConstants.S2C_AVATAR_UPLOADED, function () {
            sendRegisterUserNotification();
        });

        facade.subscribe(appConstants.S2C_USER_REGISTERED, function () {
            nicknameInput.value = '';
            usernameInput.value = '';
            passwordInput.value = '';
            retypeInput.value = '';
            alert('User sucessfully created!\nNow you can login with your user.');
        });

        facade.subscribe(appConstants.S2C_USERNAME_EXISTS, function () {
            alert('Username already exists!\nChoose another.');
        });

        // =====================================================================
    };
});
