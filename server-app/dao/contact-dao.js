"use strict";

var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    ownerUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    contactUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

var ContactModel = mongoose.model('contact', contactSchema);

module.exports = {

    persist: function (ownerUserId, contactUserId) {
        return new ContactModel({
            ownerUserId: ownerUserId,
            contactUserId: contactUserId
        }).save();
    },

    find: function (ownerUserId, contactUserId) {
        return ContactModel.find({
            ownerUserId: ownerUserId,
            contactUserId: contactUserId
        }).exec();
    },

    getForwardList: function (ownerUserId) {
        return ContactModel
            .find({ ownerUserId: ownerUserId })
            .select('_id contactUserId')
            .exec();
    }

};