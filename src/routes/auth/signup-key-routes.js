const controller = require('../../controllers/auth/signup-keys');
const validators = require('../../middleware/validators/auth/signup-keys');

module.exports = (app) => {
    app.patch('/auth/signupkeys/verify',
        [validators.verifySignupKey],
        controller.verifySignupKey);
};
