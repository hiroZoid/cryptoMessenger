"use strict";
define(function (require) {
    
    var appConstants = require('/app-constants');
    var facade = require('./facade.js');
    
    var currentUser = null;
        
    facade.subscribe(appConstants.SOCKET_USER_LOGGED, function (user) {
        currentUser = user;
    });
    
    facade.subscribe(appConstants.SOCKET_USER_LOGGED_OUT, function (user) {
        currentUser = null;
    });
    
    
    console.log('appProxy.js required');
    
    return {
        getCurrentUser: (function () {
            return currentUser;
        }).bind(this)
    };
    
});