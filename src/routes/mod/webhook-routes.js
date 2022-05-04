const controller = require("../../controllers/mod/webhook/index");
const validators = require("../../middleware/validators/mod/webhook/index");
const { authJwt } = require("../../middleware");

module.exports = (app) => {

    app.get("/mod/webhook/findall",
        [authJwt.verifyToken,
        authJwt.isModerator],
        controller.findAll);

    app.post("/mod/webhook/create",
        [authJwt.verifyToken,
        authJwt.isModerator,
        validators.create],
        controller.create);

};