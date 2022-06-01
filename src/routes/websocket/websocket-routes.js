const controller = require('../../controllers/websocket/index');

module.exports = (app) => {
    app.patch('/ws/connect',
        controller.connect);

    app.patch('/ws/disconnect',
        controller.disconnect);

    app.post('/ws/send',
        controller.testSend);

};