"use strict";

define(function (require) {

    var EditProfileView = require('text!/app/view/1.2.5-edit-profile-view.html!strip');
    var UploadAvatar = require('text!/app/view/upload-avatar.html!strip');

    var AbstractCtrl = require('./abstract-ctrl.js');
    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');
    var appProxy = require('/app/core/app-proxy.js');

    return function EditProfileCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, EditProfileView]);

        var nicknameInput = this.getDescendant('cm-nickname');
        var passwordInput = this.getDescendant('cm-password');
        var retypeInput = this.getDescendant('cm-retype');
        var avatarInput = this.getDescendant('cm-avatar');
        var currentPasswordInput = this.getDescendant('cm-current-password');


        this.getDescendant('cm-form').onsubmit = (function () {

            if (currentPasswordInput.value == '') {
                alert('Fill current password to change your profile!');
            } else if (passwordInput.value != retypeInput.value) {
                    alert("New passwords don't match!");
            } else if (
                nicknameInput.value == '' &&
                passwordInput.value == '' &&
                retypeInput.value == '' &&
                avatarInput.value == ''
            ) {
                alert("Fill some field to change your profile!");
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
                    var editProfileInput = document.createElement('input');
                    editProfileInput.setAttribute('name', 'editProfile');
                    editProfileInput.setAttribute('type', 'text');
                    editProfileInput.setAttribute('value', 'editProfile');
                    form.appendChild(editProfileInput);
                    form.appendChild(socketIdInput);
                    form.appendChild(avatarInputClone);
                    form.submit();
                }
            } else {
                sendUpdateUserNotification();
            }
            return false;
        }).bind(this);

        function sendUpdateUserNotification() {
            facade.sendNotification(appConstants.C2S_UPDATE_USER, {
                nickname: nicknameInput.value,
                password: passwordInput.value,
                avatar: avatarInput.value,
                currentPassword: currentPasswordInput.value,
            });

        }

        facade.subscribe(appConstants.S2C_AVATAR_UPDATED, function () {
            sendUpdateUserNotification();
        });

        facade.subscribe(appConstants.S2C_USER_UPDATED, function () {
            nicknameInput.value = '';
            passwordInput.value = '';
            retypeInput.value = '';
            avatarInput.value = '';
            currentPasswordInput.value = '';
            alert('User sucessfully updates!\nPlease logout and login again.');
        });

        // =====================================================================
    };
});

