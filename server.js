"use strict";

var app = require('express')();
require('./server-app/setup/routes-setup.js')(app);
require('./server-app/setup/db-setup.js')();
require('./server-app/app-constants.js');

var httpServer = app.listen(80, function () {
    console.log("Server listening on: http://localhost:80");
});

require('./server-app/setup/socket-setup.js').setup(httpServer);