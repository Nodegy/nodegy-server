"use strict";
const controller = require('../../controllers/notification/index');
const validators = require('../../middleware/validators/notification/index');
module.exports = (app) => {
    app.delete('/notification/deleteall', [validators.deleteAll], controller.deleteAll);
};
