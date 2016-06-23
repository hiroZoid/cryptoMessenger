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
        return MessageModel
            .aggregate([
                { $match: { sender: userId } },
                {
                    $group: {
                        _id: "$recipient",
                        r: { $max: "$updatedAt" }
                    }
                }
            ])
            .exec();
        // return MessageModel
        //     .find({
        //         $or: [
        //             { sender: userId },
        //             { recipient: userId }
        //         ]
        //     })
        //     .sort({ updatedAt: -1 })
        //     .populate('sender', '_id username nickname')
        //     .populate('recipient', '_id username nickname')
        //     .select('updatedAt')
        //     .exec();
    }
};