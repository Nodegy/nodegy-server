"use strict";
const controller = require('../../controllers/admin/role/index');
const validators = require('../../middleware/validators/admin/role/index');
const { authJwt } = require('../../middleware');
module.exports = (app) => {
    app.patch('/adm/role/update', [authJwt.verifyToken,
        authJwt.isAdmin,
        validators.update], controller.update);
};
