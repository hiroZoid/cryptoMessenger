"use strict";

module.exports = function () {

    let mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/cryptoMessenger');

    var db = mongoose.connection;

    db.once('open', function () {
        console.log("Sucessfully connected to MongoDB.");
    });

    db.on('disconnected', function () {
        console.log('Disconnected from MongoDB.');
    });

    db.on('error', function (err) {
        console.log('MongoDB connection error: ' + err);
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('MongoDB disconnected on SIGINT triggered.');
            process.exit(0);
        });
    });

    console.log('db-setup.js executed.');
};