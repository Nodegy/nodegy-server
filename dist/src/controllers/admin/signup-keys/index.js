"use strict";
const deleteSignupKeys = require('./delete-signup-keys');
const generateSignupKeys = require('./generate-signup-keys');
const getSignupKeys = require('./get-signup-keys');
const sendSignupKey = require('./send-signup-key');
module.exports = {
    deleteSignupKeys,
    getSignupKeys,
    generateSignupKeys,
    sendSignupKey,
};
