const controller = require('../../controllers/admin/signup-keys/index');
const validators = require('../../middleware/validators/admin/signup-keys/index');
const { authJwt } = require('../../middleware');

module.exports = (app) => {
    app.patch('/adm/signupkeys/generate',
        [authJwt.verifyToken,
        authJwt.isAdmin,
        validators.generateSignupKeys],
        controller.generateSignupKeys);

    app.get('/adm/signupkeys/getall',
        [authJwt.verifyToken,
        authJwt.isAdmin],
        controller.getSignupKeys);

    app.patch('/adm/signupkeys/delete',
        [authJwt.verifyToken,
        authJwt.isAdmin,
        validators.deleteSignupKeys],
        controller.deleteSignupKeys);

    app.patch('/adm/signupkeys/send',
        [authJwt.verifyToken,
        authJwt.isAdmin,
        validators.sendSignupKey],
        controller.sendSignupKey);
};
