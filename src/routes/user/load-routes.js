const controller = require("../../controllers/user/load/index");
const { authJwt } = require("../../middleware");

module.exports = (app) => {

    app.get("/usr/load/stratstore",
        [authJwt.verifyToken],
        controller.stratStore);

};