"use strict";

var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    ownerUser: { type: mongoose.Schema.Types.ObjectId, required: true },
    contactUser: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

var contactModel = mongoose.model('contact', contactSchema);
