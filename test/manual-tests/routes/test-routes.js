const controller = require('../../run-tests/controllers/test-controller');
const eventBusController = require('../controllers/event-bus-controller');
const { authJwt } = require('../../../src/middleware');

module.exports = (app) => {

    app.get('/tst/event/getevents',
        eventBusController.getEvents);

    app.post('/tst/event/subscribe',
        eventBusController.subscribe);

    app.get('/tst/event/unsubscribe',
        eventBusController.unsubscribe);

    app.get('/tst/event/publish',
        eventBusController.publish);

    app.get('/tst/auth/all',
        controller.allAccess);

    app.get('/tst/auth/user',
        [authJwt.verifyToken],
        controller.userBoard);

    app.get('/tst/auth/mod',
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard);

    app.get('/tst/auth/admin',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard);

};
