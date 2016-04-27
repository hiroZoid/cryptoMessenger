"use strict";

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    profile: { type: mongoose.Schema.Types.ObjectId, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: mongoose.Schema.Types.Buffer, required: true }
}, { timestamps: true });

var messageModel = mongoose.model('message', messageSchema);
