"use strict";

var express = require('express');
var app = express();
require('./server-app/setup/routes-setup.js')(app);
require('./server-app/setup/db-setup.js');
