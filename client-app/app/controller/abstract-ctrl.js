"use strict";

define(function (require) {

    var appConstants = require('/app-constants.js');
    var facade = require('/app/core/facade.js');

    function createView(htmlString) {
        var div = document.createElement('div');
        div.className = 'stretch';
        div.innerHTML = htmlString;
        return div.firstChild;
    }

    function getDescendant(className) {
        if (this.descendantIndex[className] === undefined) {
            if (this.view.hasClassName(className)) {
                this.descendantIndex[className] = this.view;
            } else {
                this.descendantIndex[className] = this.view.getElementsByClassName(className)[0];
            }
        }
        return this.descendantIndex[className];
    }

    function showView() {
        if (this.view.parentNode !== this.parentElement) {
            this.parentElement.appendChild(this.view);
        }
    }

    function hideView() {
        if (this.view.parentNode !== null) {
            this.view.parentNode.removeChild(this.view);
        }
    }

    function viewIsShown() {
        return this.view.parentNode === this.parentElement;
    }

    function render() {
        if (this.children !== undefined) {
            this.renderAll();
        }
        this.showView();
    }

    function renderAll() {
        for (var key in this.children) {
            if (this.children[key].render) {
                this.children[key].render();
            }
        }
    }

    function removeAllChildrenFrom(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    return function AbstractCtrl(parentElement, View) {
        this.getDescendant = getDescendant.bind(this);
        this.createView = createView.bind(this);
        this.showView = showView.bind(this);
        this.hideView = hideView.bind(this);
        this.viewIsShown = viewIsShown.bind(this);
        this.render = render.bind(this);
        this.renderAll = renderAll.bind(this);
        this.removeAllChildrenFrom = removeAllChildrenFrom.bind(this);

        this.descendantIndex = {};
        this.parentElement = parentElement;
        this.view = this.createView(View);
        this.view.setAttribute('name', this.constructor.name);
    };
});