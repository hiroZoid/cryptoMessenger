"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');

    function createMenuItem(textContent, onclick) {
        var a = document.createElement('spam');
        a.textContent = textContent;
        a.style.cursor = 'pointer';
        a.style.cursor = 'hand';
        a.onclick = onclick;

        var li = document.createElement('li');
        li.style.display = 'inline';
        li.style.paddingRight = '1em';
        li.appendChild(a);
        return li;
    }

    return function NavBar(parentController, parentElement) {
        // =====================================================================

        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = 'calc(100% - 0.25em)';
        view.style.height = '3em';
        view.style.color = 'whitesmoke';

        var h1 = document.createElement('h1');
        h1.textContent = 'CryptoMessenger';
        h1.style.height = '100%';
        h1.style.verticalAlign = 'middle';
        h1.style.display = 'inline';
        h1.style.cssFloat = 'left';
        view.appendChild(h1);

        var menu = document.createElement('ul');
        menu.style.height = '100%';
        menu.style.verticalAlign = 'middle';
        menu.style.listStyleType = 'none';
        menu.style.lineHeight = '3em';
        menu.style.display = 'inline';
        menu.style.cssFloat = 'right';
        view.appendChild(menu);

        var logIn = createMenuItem('Log In', function () {
            parentController.menuItemClicked('logIn');
        });
        menu.appendChild(logIn);

        var chat = createMenuItem('Chat', function () {
            parentController.menuItemClicked('chat');
        });
        menu.appendChild(chat);

        var logOut = createMenuItem('Log Out', function () {
            parentController.menuItemClicked('logOut');
        });
        menu.appendChild(logOut);

        this.getStyleHeight = function () {
            console.log('NavBar.getStyleHeight()');
            return view.style.height;
        };

        this.render = function () {
            console.log('NavBar.render()');
            AbstractView.append(view, parentElement);
        };

        // =====================================================================
    };
});
