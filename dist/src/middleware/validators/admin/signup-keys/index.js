"use strict";
const deleteSignupKeys = require('./delete-signup-keys');
const generateSignupKeys = require('./generate-signup-keys');
const sendSignupKey = require('./send-signup-key');
module.exports = {
    deleteSignupKeys,
    generateSignupKeys,
    sendSignupKey
};
