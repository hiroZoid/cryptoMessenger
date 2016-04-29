"use strict";

var app = require('express')();
require('./server-app/setup/routes-setup.js')(app);
require('./server-app/setup/db-setup.js')();

var httpServer = app.listen(80, function () {
    console.log("Server listening on: http://localhost:80");
});

require('./server-app/setup/socket-setup.js').setup(httpServer);

/*
var userModel = require('./server-app/model/user-model.js');
userModel.save('hiroZ', 'hiro')
    .then(function (user) {
        console.log(user);
    }).catch(function (err) {
        console.log(err);
    });

userModel.retrieve('hiroZ', 'hiro')
    .then(function (user) {
        console.log(user);
    }).catch(function (err) {
        console.log(err);
    });

*/