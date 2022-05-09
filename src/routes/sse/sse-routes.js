const controller = require('../../services/sse/index');

module.exports = (app) => {

    app.get('/initializesseevents',
        controller.eventsHandler);

};