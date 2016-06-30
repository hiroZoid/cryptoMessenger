"use strict";

define(function (require) {
    console.log('facade.js executed');
    return {
        pool: {},

        subscribe: function (notification, callback) {
            //console.log('Subscribed to notification: ', notification, callback);
            if (this.pool[notification] === undefined) {
                this.pool[notification] = [];
            }
            this.pool[notification].push(callback);
        },

        unSubscribe: function (notification, callback) {
            if (this.pool[notification] !== undefined) {
                i = this.pool[notification].indexOf(callback);
                if (i > -1) {
                    this.pool[notification].slice(i, 1);
                }
            }
        },

        sendNotification: function (notification, obj) {
            console.log('Sending notification: ', notification, (obj === undefined) ? "" : obj);
            if (this.pool[notification] !== undefined) {
                this.pool[notification].forEach(function (callback) {
                    callback(obj);
                });
            }
        }
    };
});