"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true, trim: true },
    password: { type: mongoose.Schema.Types.String, required: true }
}, { timestamps: true });

var userModel = mongoose.model('user', userSchema);

module.exports.retrieve = function (username, password) {
    return userModel.findOne({
        username: username,
        password: password
    }).exec();
};

module.exports.retrieveAll = function () {
    return userModel.find({}).select('_id username').exec();
};


module.exports.save = function (username, password) {
    return new userModel({
        username: username,
        password: password
    }).save();
};