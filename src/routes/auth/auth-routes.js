const controller = require("../../controllers/auth/index");
const validators = require("../../middleware/validators/auth/index");
const { verifySignUp, verifySignupKey } = require("../../middleware");

module.exports = (app) => {

    app.post("/auth/signup",
        [
            validators.signup,
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
            verifySignupKey,
        ],
        controller.signup);

    app.post("/auth/signin",
        [validators.signin],
        controller.signin);

};