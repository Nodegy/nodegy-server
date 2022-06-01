"use strict";
const authJwt = require('./auth/auth-jwt');
const verifyMailingListAddress = require('./auth/verify-mailing-list-address');
const verifySignupKey = require('./auth/verify-signup-key');
const verifySignUp = require('./auth/verify-signup');
const handleStrategy = require('./strategy/handle-strategy');
module.exports = {
    authJwt,
    verifyMailingListAddress,
    verifySignUp,
    verifySignupKey,
    handleStrategy
};
