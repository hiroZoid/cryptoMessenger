"use strict";

var app = require('express')();
require('./server-app/setup/routes-setup.js')(app);
require('./server-app/setup/db-setup.js')();
require('./server-app/app-constants.js');

var httpServer = app.listen(80, function () {
    console.log("Server listening on: http://localhost:80");
});

require('./server-app/setup/socket-setup.js').setup(httpServer);

var aesKey = 'xm41ldgjvqkty3a2gospo7sveefas2g';
var CryptoJS = require('crypto-js');
console.log(CryptoJS.AES.decrypt('U2FsdGVkX19GAmP+OLJmwcm4kSK2Yl4XTdmJPhm1aqY=', aesKey).toString(CryptoJS.enc.Utf8));
