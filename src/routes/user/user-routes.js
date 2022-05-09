const controller = require('../../controllers/user/user/index');
const validators = require('../../middleware/validators/user/user/index');
const { authJwt } = require('../../middleware');

module.exports = (app) => {

    app.patch('/usr/user/update',
        [authJwt.verifyToken,
        validators.update],
        controller.update);

    app.delete('/usr/user/delete',
        [authJwt.verifyToken,
        validators.deleteUser],
        controller.deleteUser);

};
