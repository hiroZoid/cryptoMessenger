"use strict";

var profileDao = require('../dao/profile-dao.js');

var plaintextProfile = null;

profileDao.retrievePlaintextProfile()
    .then(function (profile) {
        plaintextProfile = profile;
        console.log('Plaintext profile retrieved.');
    })
    .catch(function (err) {
        console.log('Could not retrieve plaintext profile!');
        process.kill(process.pid, 'SIGINT');
    });

module.exports = {
    getPlaintextProfile: function () {
        return plaintextProfile;
    }
};