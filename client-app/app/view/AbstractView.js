"use strict";

define(function (require) {

    var socket = require('/socket.io/socket.io.js')();
    var socketProxy = require('../proxy/socket-proxy.js');

    socket.on('contactList', function (contactList) {
        socketProxy.notifyAll('contactList', contactList);
        console.log(contactList);
    });

    socket.on('invalidCredentials', function () {
        socketProxy.notifyAll('invalidCredentials');
        console.log('Invalid credentials!');
    });

    function renderAll(children) {
        for (var key in children) {
            if (children[key].render) {
                children[key].render();
            }
        }
    }

    function removeAllChildrenFrom(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    return function () {
        // =====================================================================

        this.renderAll = renderAll;
        this.removeAllChildrenFrom = removeAllChildrenFrom;
        this.socket = socket;
        this.socketProxy = socketProxy;

        // =====================================================================
    };
});