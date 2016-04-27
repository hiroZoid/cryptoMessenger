"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true, trim: true },
    password: { type: mongoose.Schema.Types.String, required: true }
}, { timestamps: true });

var userModel = mongoose.model('user', userSchema);

module.exports.authenticate = function (username, password) {
    return userModel.findOne({
        username: username,
        password: password
    }).select('_id').exec();
};