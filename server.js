"use strict";

var express = require('express');
var app = express();
require('./server-app/setup/routes-setup.js')(app);
require('./server-app/setup/db-setup.js');

var userModel = require('./server-app/model/user-model.js');
userModel.authenticate('hiro', 'hiro')
    .then(function (user) {
        console.log(user);
    }).catch(function (err) {
        console.log(err);
    });

