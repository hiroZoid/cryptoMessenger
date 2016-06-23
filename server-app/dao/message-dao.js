"use strict";

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: mongoose.Schema.Types.String, required: true }
}, { timestamps: true });

var MessageModel = mongoose.model('message', messageSchema);

module.exports = {
    persist: function (sender, recipient, message) {
        return new MessageModel({
            sender: sender,
            recipient: recipient,
            message: message
        }).save();
    },

    getFullHistory: function (userId1, userId2) {
        return MessageModel.find({
            $or: [
                { sender: userId1, recipient: userId2 },
                { sender: userId2, recipient: userId1 }
            ]
        }).exec();
    },

    getConversationList: function (userId) {
        return Promise.all([
            MessageModel
                .aggregate([
                    { $match: { sender: userId } },
                    { $group: { _id: "$recipient", lastMessage: { $max: "$createdAt" }, } },
                    { $sort: { lastMessage: -1 } }
                ])
                .exec(),
            MessageModel
                .aggregate([
                    { $match: { recipient: userId } },
                    { $group: { _id: "$sender", lastMessage: { $max: "$createdAt" } } },
                    { $sort: { lastMessage: -1 } }
                ])
                .exec()
        ]).then(function (results) {
            var result1 = results[0];
            var result2 = results[1];
            var result = [];
            while (result1.length > 0 || result2.length > 0) {
                if (result1.length === 0) {
                    result.push(result2.shift());
                } else if (result2.length === 0) {
                    result.push(result1.shift());
                } else if (result2[0].lastMessage < result1[0].lastMessage) {
                    result.push(result2.shift());
                } else {
                    result.push(result1.shift());
                }
            }
            for (var i = 0; i < result.length; i++) {
                for (var j = result.length - 1; j > i; j--) {
                    if (result[i]._id.equals(result[j]._id)) {
                        result.splice(j, 1);
                    }
                }
            }
            return Promise.resolve(result);
        }).catch(function (err) {
            return Promise.reject(err);
        });
        
    }
};