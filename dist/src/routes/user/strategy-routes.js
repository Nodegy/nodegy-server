"use strict";
const { authJwt } = require('../../middleware');
const validators = require('../../middleware/validators/user/strategy/index');
const controller = require('../../controllers/user/strategy/index.js');
module.exports = (app) => {
    app.post('/usr/strategy/create', [authJwt.verifyToken,
        validators.create], controller.create);
    app.delete('/usr/strategy/delete/:id', [authJwt.verifyToken,
        validators.deleteStrategy], controller.deleteStrategy);
    app.patch('/usr/strategy/update', [authJwt.verifyToken,
        validators.update], controller.update);
};
