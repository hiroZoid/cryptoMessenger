"use strict";

module.exports = function (app) {

    let express = require('express');
    let serverPath = process.cwd();

    app.use(express.static(serverPath + '/client-app'));

    app.get('/', function (request, response) {
        response.sendFile(serverPath + '/client-app/index.html');
    });

    app.get('*', function (request, response) {
        response.end('It Works!! Path Hit: ' + request.url);
    });

    console.log('routes-setup.js executed.');
};