"use strict";
define(function (require) {
    require('/app/setup/general-setup.js');
    require('/app/setup/socket-setup.js');
    require('/app/core/chat-proxy.js');
    require('/app/core/app-proxy.js');
    
    var AppCtrl = require('/app/controller/1-app-ctrl.js');
    var appCtrl = new AppCtrl(document.body);
    appCtrl.render();
    
    console.log('main executed!');
});