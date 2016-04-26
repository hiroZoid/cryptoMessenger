"use strict";

require('./server-app/app.js');



var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Sucessfully connected to mongo.");
});

var userSchema = mongoose.Schema({
    //_id: ObjectId,
    username: String,
    password: String
});

var userCollection = mongoose.model('user', userSchema);

userCollection.findOne({ username: 'hiro' }).exec(function (err, user) {
    if (err) return handleError(err);
    console.log('user.username: ' + user.username);
    console.log('user.password: ' + user.password);
});