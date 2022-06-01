"use strict";
const controller = require('../../controllers/mod/mailing-list/index');
const validators = require('../../middleware/validators/mod/mailing-list/index');
const { authJwt } = require('../../middleware');
module.exports = (app) => {
    app.get('/mod/mailinglist/get', [authJwt.verifyToken,
        authJwt.isModerator], controller.getMailingList);
    app.patch('/mod/mailinglist/delete', [authJwt.verifyToken,
        authJwt.isModerator,
        validators.deleteAddresses], controller.deleteAddresses);
};
