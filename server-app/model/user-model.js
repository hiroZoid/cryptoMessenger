"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    created: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    changed: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    }
});

var userModel = mongoose.model('user', userSchema);

module.exports.authenticate = function (username, password) {
    return userModel.findOne({
        username: username,
        password: password
    }).select('_id').exec();
};