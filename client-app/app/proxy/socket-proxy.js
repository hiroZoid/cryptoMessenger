"use strict";

define(function (require) {
    console.log('socket-proxy.js executed');
    return {
        observerPool: {},
        
        subscribe: function (socketEventType, callback) {
            if (!this.observerPool[socketEventType]) {
                this.observerPool[socketEventType] = [];
            }
            this.observerPool[socketEventType].push(callback);
        },
        
        notifyAll: function (socketEventType, object) {
            if (this.observerPool[socketEventType]) {
                this.observerPool[socketEventType].forEach(function (callback) {
                    callback(object);
                });
            }
        }
    };
});