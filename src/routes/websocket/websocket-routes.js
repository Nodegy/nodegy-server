const controller = require('../../controllers/websocket/index');

module.exports = (app) => {
    app.post('/ws/connect',
        controller.connect);

    app.post('/ws/disconnect',
        controller.disconnect);

    app.post('/ws/send',
        controller.testSend);

};