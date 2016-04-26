"use strict";

function ContactList(parentController, parentElement) {
    var view = document.createElement('div');
    view.className = 'contactList';

    var data = [];
    this.setData = function (newData) {
        console.log('ContactList.setData()');
        data = newData;
    };

    this.render = function () {
        console.log('ContactList.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        while (view.firstChild) {
            view.removeChild(view.firstChild);
        }
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
}
