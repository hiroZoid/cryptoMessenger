"use strict";
define(function (require) {
    require('/app/core/chat-proxy.js');
    require('/app/core/app-proxy.js');
    require('/app/setup/general-setup.js')();
    require('/app/setup/socket-setup.js')();
    require('/app/setup/key-setup.js')();
    console.log('main executed!');
});