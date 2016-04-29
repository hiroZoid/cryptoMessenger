"use strict";
define(function (require) {
    var App = require('./controllers/App');
    var app = new App(document.body);
    app.render();
    console.log('main executed!');
});