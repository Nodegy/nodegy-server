const controller = require("../../controllers/mod/feedback/index.js");
const validators = require("../../middleware/validators/mod/feedback/index");
const { authJwt } = require("../../middleware");

module.exports = (app) => {

    app.get("/mod/feedback/findall",
        [authJwt.verifyToken,
        authJwt.isModerator],
        controller.findAll);

    app.patch("/mod/feedback/updatehandled",
        [authJwt.verifyToken,
        authJwt.isModerator,
        validators.updateHandled],
        controller.updateHandled);

    app.delete("/mod/feedback/delete/:id",
        [authJwt.verifyToken,
        authJwt.isModerator,
        validators.deleteFeedback],
        controller.deleteFeedback);
};