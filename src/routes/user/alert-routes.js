const controller = require('../../controllers/user/alert/index.js');
const validators = require('../../middleware/validators/user/alert/index');
const { authJwt } = require('../../middleware');

module.exports = (app) => {

    app.post('/usr/alert/create',
        [authJwt.verifyToken,
        validators.create],
        controller.create);

    app.patch('/usr/alert/update',
        [authJwt.verifyToken,
        validators.update],
        controller.update);

    app.delete('/usr/alert/delete/:id',
        [authJwt.verifyToken,
        validators.deleteAlert],
        controller.deleteAlert);

};