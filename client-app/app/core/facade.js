"use strict";

define(function (require) {
    console.log('facade.js executed');
    return {
        pool: {},
        
        subscribe: function (notification, callback) {
            if (this.pool[notification] === undefined) {
                this.pool[notification] = [];
            }
            this.pool[notification].push(callback);
        },
        
        unSubscribe: function (notification, callback) {
            if (this.pool[notification] !== undefined) {
                let i = this.pool[notification].indexOf(callback);
                if (i > -1) {
                    this.pool[notification].slice(i, 1);
                }
            }
        },
        
        sendNotification: function (notification, obj) {
            if (this.pool[notification] !== undefined) {
                this.pool[notification].forEach(function (callback) {
                    callback(obj);
                });
            }
        }
    };
});