"use strict";

function NavBar(parentController, parentElement) {
    AbstractController.call(this);
    
    var view = document.createElement('div');
    view.setAttribute('name', this.constructor.name); 
    view.style.width = 'calc(100% - 0.25em)';
    view.style.height = '3em';
    view.style.color = 'whitesmoke';
    view.innerHTML = '<h1>CryptoMessenger</h1>';

    this.getStyleHeight = function () {
        console.log('NavBar.getStyleHeight()');
        return view.style.height;
    };

    this.render = function () {
        console.log('NavBar.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
    };
}
