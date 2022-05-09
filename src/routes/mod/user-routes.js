const controller = require('../../controllers/mod/user/index');
const { authJwt } = require('../../middleware');
const validators = require('../../middleware/validators/mod/user/index');
const { verifySignUp } = require('../../middleware');

module.exports = (app) => {

    app.get('/mod/user/findall',
        [authJwt.verifyToken,
        authJwt.isModerator],
        controller.findAll);

    app.post('/mod/user/create',
        [authJwt.verifyToken,
        authJwt.isModerator,
        validators.create,
        verifySignUp.checkDuplicateUsernameOrEmail,],
        controller.create);

    app.patch('/mod/user/update',
        [authJwt.verifyToken,
        authJwt.isModerator,
        validators.update],
        controller.update);

    app.delete('/mod/user/delete/:id',
        [authJwt.verifyToken,
        authJwt.isModerator,
        validators.deleteUser],
        controller.deleteUser);

};
