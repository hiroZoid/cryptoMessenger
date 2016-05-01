"use strict";

define(function (require) {

    var AbstractView = require('./AbstractView');

    return function ContactList(parentController, parentElement) {
        // =====================================================================
        
        AbstractView.call(this);

        var view = document.createElement('div');
        view.setAttribute('name', this.constructor.name);
        view.style.width = '100%';
        view.style.overflow = 'auto';

        var data = [];

        this.setStyleHeight = function (height) {
            view.style.height = height;
        }

        this.setData = function (newData) {
            console.log('ContactList.setData()');
            data = newData;
        };

        this.render = function () {
            console.log('ContactList.render()');
            if (view.parentNode !== parentElement) {
                parentElement.appendChild(view);
            }

            this.removeAllChildrenFrom(view);

            for (var i = 0; i < data.length; i++) {
                var img = document.createElement('img');
                img.src = data[i].avatar;
                img.className = 'avatar';

                var p = document.createElement("p");
                p.textContent = data[i].name;

                var div = document.createElement("div");
                div.className = 'contact';
                div.appendChild(img);
                div.appendChild(p);
                div.data = data[i];
                div.addEventListener("click", function (e) {
                    console.log('ContactList.onContactClicked()');
                    parentController.setChatBoxData(e.target.data);
                });

                view.appendChild(div);
            }
        };

        // =====================================================================
    };
});
