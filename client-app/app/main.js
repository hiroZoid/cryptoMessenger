"use strict";
define(function (require) {
    require('./socket.js');
    require('./chatProxy.js');
    require('./appProxy.js');
    var App = require('./view/App');
    var app = new App(document.body);
    app.render();
    console.log('main executed!');
});