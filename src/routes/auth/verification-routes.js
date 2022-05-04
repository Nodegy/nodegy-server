const controller = require("../../controllers/auth/verification/index");
const validators = require("../../middleware/validators/auth/verification/index");
const { authJwt, verifySignUp } = require("../../middleware");

module.exports = (app) => {

    app.patch("/auth/verification/confirmemail",
        [authJwt.verifyToken,
        validators.confirmEmail],
        controller.confirmEmail);

    app.patch("/auth/verification/resetpw",
        [validators.resetPw],
        controller.resetPw);

    app.patch("/auth/verification/checkemailexists",
        [validators.checkEmailExists],
        controller.checkEmailExists);

    app.patch("/auth/verification/sendverificationemail",
        [
            authJwt.verifyToken,
            validators.sendVerificationEmail,
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        controller.sendVerificationEmail);

    app.patch("/auth/verification/sendpwresetvcode",
        [validators.sendPwResetVCode],
        controller.sendPwResetVCode);

};