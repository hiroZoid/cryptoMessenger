"use strict";

function BoxTitle(parentController, parentElement) {
    AbstractController.call(this);

    var view = document.createElement('div');
    view.setAttribute('name', this.constructor.name); 
    view.style.width = '100%';
    view.style.height = '2.5em';
    view.style.borderBottom = 'solid blue 0.25em';
    view.style.marginBottom = '0.25em';
    view.style.display = 'inline-flex';
    view.style.alignItems = 'center';

    this.getStyleHeight = function () {
        return '(' + view.style.height + ' + ' + view.style.marginBottom + ')';
    };

    this.setInnerHTML = function (innerHTML) {
        view.innerHTML = innerHTML;
    };

    this.appendChild = function (child) {
        view.appendChild(child);
    };

    this.clear = function () {
        this.removeAllChildrenFrom(view);
    };

    this.render = function () {
        console.log('BoxTitle.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
    };
}
