"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    nickname: { type: mongoose.Schema.Types.String, trim: true },
    username: { type: mongoose.Schema.Types.String, required: true, unique: true, trim: true },
    avatar: { type: mongoose.Schema.Types.String, trim: true },
    password: { type: mongoose.Schema.Types.String, required: true }
}, { timestamps: true });

var userModel = mongoose.model('user', userSchema);

module.exports = {

    persist: function (nickname, username, password, avatar) {
        return new userModel({
            nickname: nickname,
            username: username,
            password: password,
            avatar: avatar
        }).save();
    },

    retrieve: function (username, password) {
        return userModel.findOne({
            username: username,
            password: password
        }).select('_id username nickname avatar').exec();
    },

    update: function (userId, objectUpdate) {
        return userModel.findOneAndUpdate(
            { _id: userId },
            objectUpdate
        ).exec();
    },

    retrieveAll: function () {
        return userModel.find({}).select('_id nickname').exec();
    },

    retrieveAllExcept: function (userId) {
        return userModel.find({ _id: { $ne: userId } }).select('_id nickname avatar').exec();
    },

    findByNickName: function (nickname) {

    },
}