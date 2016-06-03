"use strict";

define(function (require) {

    var AbstractCtrl = require('./abstract-ctrl.js');
    var AppView = require('text!/app/view/1-app-view.html!strip');
    var NavBarCtrl = require('./1.1-nav-bar-ctrl.js');
    var ViewStackCtrl = require('./1.2-view-stack-ctrl.js');

    return function AppCtrl(parentElement) {
        // =====================================================================

        AbstractCtrl.apply(this, [parentElement, AppView]);

        this.children = {
            navBar: new NavBarCtrl(this.getDescendant('cm-nav-bar')),
            viewStack: new ViewStackCtrl(this.getDescendant('cm-view-stack'))
        };
        //this.children.viewStack.subtractFromHeight(this.children.navBar.getStyleHeight());

        // =====================================================================
    };
});