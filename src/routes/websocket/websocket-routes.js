const controller = require('../../controllers/websocket');
// const validators = require('../../middleware/validators/auth/index');

module.exports = (app) => {
    app.patch('/ws/connect',
        controller.connect);

    app.patch('/ws/disconnect',
        controller.disconnect);

};