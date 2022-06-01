"use strict";
const checkEmailExists = require('./check-email-exists');
const confirmEmail = require('../confirm');
const resetPw = require('./reset-pw');
const sendPwResetVCode = require('./send-pw-reset-v-code');
const sendVerificationEmail = require('./send-verification-email');
module.exports = {
    checkEmailExists,
    confirmEmail,
    resetPw,
    sendPwResetVCode,
    sendVerificationEmail,
};
