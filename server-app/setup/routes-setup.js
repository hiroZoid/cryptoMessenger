"use strict";

module.exports = function (app) {

    let appConstants = require('../app-constants.js');
    let express = require('express');
    let serverPath = process.cwd();

    app.use(express.static(serverPath + '/client-app'));

    app.get('/', function (request, response) {
        response.sendFile(serverPath + '/client-app/index.html');
    });

    app.get('/app-constants.js', function (request, response) {
        response.end(
            '"use strict";\n' +
            'define(function () {\n' +
            '    return ' + JSON.stringify(appConstants) + ';\n' +
            '});'
        );
    });

    app.get('/public-key', function (request, response) {
        response.sendFile(serverPath + '/rsa-keys/rsa_1024_pub.pem');
    });

    /*
    app.get('/private-key', function (request, response) {
        response.sendFile(serverPath + '/rsa-keys/rsa_1024_priv.pem');
    });
    */
    
    app.get('*', function (request, response) {
        response.end('This is nowhere. Path Hit: ' + request.url);
    });

    console.log('routes-setup.js executed.');
};