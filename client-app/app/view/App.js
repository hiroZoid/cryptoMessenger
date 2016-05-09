"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');
    var NavBar = require('./NavBar');
    var ViewStack = require('./ViewStack');

    return function App(parentElement) {
        // =====================================================================
        
        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100vw';
        view.style.height = '100vh';
        view.style.backgroundColor = '#004';

        var children = {
            navBar: new NavBar(this, view),
            viewStack: new ViewStack(this, view)
        };

        children.viewStack.subtractFromHeight(children.navBar.getStyleHeight());
        
        this.render = function () {
            console.log('App.render()');
            AbstractView.append(view, parentElement);
            AbstractView.renderAll(children);
        };

        // =====================================================================
    };
});