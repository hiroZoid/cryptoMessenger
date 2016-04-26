"use strict";

define(function (require) {

    var AbstractController = require('./AbstractController');
    var ChatView = require('./ChatView');

    return function ViewStack(parentController, parentElement) {
        // =====================================================================
        
        AbstractController.call(this);

        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100%';

        this.subtractFromHeight = function (value) {
            console.log('ViewStack.subtractFromHeight()');
            view.style.height = 'calc(100% - ' + value + ')';
        };

        var children = {
            chatView: new ChatView(this, view)
        };

        this.setChatViewData = function name(newData) {
            children.chatView.setData(newData);
        };

        this.render = function () {
            console.log('ViewStack.render()');
            if (view.parentNode !== parentElement) {
                parentElement.appendChild(view);
            }
            this.renderAll(children);
        };
      
        // =====================================================================
    };
});
