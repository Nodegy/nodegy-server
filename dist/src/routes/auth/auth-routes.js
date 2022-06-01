"use strict";
const controller = require('../../controllers/auth/index');
const validators = require('../../middleware/validators/auth/index');
const { verifySignUp } = require('../../middleware');
module.exports = (app) => {
    app.post('/auth/confirm', [validators.confirm], controller.confirm);
    app.post('/auth/signup', [
        validators.signup,
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted,
    ], controller.signup);
    app.post('/auth/signin', [validators.signin], controller.signin);
};
