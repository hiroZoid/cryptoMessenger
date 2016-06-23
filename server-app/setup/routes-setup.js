"use strict";

module.exports = function (app) {

    var busboy = require('connect-busboy');
    let appConstants = require('../app-constants.js');
    let express = require('express');
    var fs = require('fs-extra');
    let serverPath = process.cwd();
    let socketBusiness = require('../business/socket-business.js');

    app.use(busboy());
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

    app.route('/upload-avatar').post(function (request, response, next) {
        var socketId = null;
        request.pipe(request.busboy);
        request.busboy.on('field', function (fieldname, value) {
            if (fieldname === 'socketId') {
                socketId = value;
            }
            console.log(fieldname, value);
        });
        request.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            if (socketId === null) {
                console.log('socketId not defined! Image will not be uploaded.')
                return;
            }

            var filenameToSave = socketId + filename.substring(filename.lastIndexOf('.'));
            console.log("Uploading: " + filename + " as " + filenameToSave);

            //Path where image will be uploaded
            var fstream = fs.createWriteStream(serverPath + '/client-app/img/' + filenameToSave);
            file.pipe(fstream);
            fstream.on('close', function () {
                socketBusiness.notifyAvatarUploaded(socketId);
                console.log("Upload Finished of " + filename);
            });
        });
        response.end('Path Hit: ' + request.url);
        console.log('Path Hit: ' + request.url);
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