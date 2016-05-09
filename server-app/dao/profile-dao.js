"use strict";

var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    ownerUser: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: mongoose.Schema.Types.String, trim: true },
    // pubkey: mongoose.Schema.Types.String
}, { timestamps: true });

var profileModel = mongoose.model('profile', profileSchema);

module.exports = {

    retrievePlaintextProfile: function () {
        return profileModel.findOne({
            name: 'plaintext',
            ownerUser: undefined
        }).exec();
    },

}