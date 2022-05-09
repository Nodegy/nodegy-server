const controller = require('../../controllers/user/webhook/index');
const validators = require('../../middleware/validators/user/webhook/index');
const { authJwt, handleStrategy } = require('../../middleware');

module.exports = (app) => {

    app.post('/wh/:eid',
        [validators.create,
            handleStrategy],
        controller.create);

    app.delete('/usr/webhook/deleteone/:id',
        [authJwt.verifyToken,
        validators.deleteOne],
        controller.deleteOne);

    app.delete('/usr/webhook/deleteall',
        [authJwt.verifyToken,
        validators.deleteAll],
        controller.deleteAll);

};