const controller = require('../../controllers/websocket/index.ts');

module.exports = (app) => {
    app.patch('/ws/connect',
        controller.connect);

    app.patch('/ws/disconnect',
        controller.disconnect);

    app.post('/ws/send',
        controller.testSend);

};