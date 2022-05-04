const controller = require("../../controllers/site-error/index");
const validators = require("../../middleware/validators/site-error/index");

module.exports = (app) => {

    app.post("/site/error",
        [
            validators.create,
        ],
        controller.create);

};