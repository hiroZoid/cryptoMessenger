"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    nickname: { type: mongoose.Schema.Types.String, trim: true },
    username: { type: mongoose.Schema.Types.String, required: true, unique: true, trim: true },
    password: { type: mongoose.Schema.Types.String, required: true }
}, { timestamps: true });

var userModel = mongoose.model('user', userSchema);

module.exports = {

    retrieve: function (username, password) {
        return userModel.findOne({
            username: username,
            password: password
        }).exec();
    },

    retrieveAll: function () {
        return userModel.find({}).select('_id nickname').exec();
    },

    persist: function (nickname, username, password) {
        return new userModel({
            nickname: nickname,
            username: username,
            password: password
        }).save();
    },
}