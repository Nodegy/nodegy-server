"use strict";
const controller = require('../../controllers/user/feedback/index');
const validators = require('../../middleware/validators/user/feedback/index');
const { authJwt } = require('../../middleware');
module.exports = (app) => {
    app.post('/usr/feedback/create', [authJwt.verifyToken,
        validators.create], controller.create);
};
