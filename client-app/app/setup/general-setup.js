"use strict";
define(function (require) {
    return function () {

        var appConstants = require('/app-constants.js');
        var facade = require('/app/core/facade.js');

        Element.prototype.hasClassName = function (name) {
            return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
        };

        Element.prototype.addClassName = function (name) {
            if (!this.hasClassName(name)) {
                this.className = this.className ? [this.className, name].join(' ') : name;
            }
        };

        Element.prototype.removeClassName = function (name) {
            if (this.hasClassName(name)) {
                var c = this.className;
                this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
            }
        };

        facade.subscribe(appConstants.S2C_KEY_RECEIVED, function () {
            var AppCtrl = require('/app/controller/1-app-ctrl.js');
            var appCtrl = new AppCtrl(document.body);
            appCtrl.render();
            console.log('appCtrl.render();');
        });

        console.log('general-setup.js required');

    }
});