module.exports = (server, chai) => {
    require('./controllers/alert.controller')(server, chai);
    // require('./controllers/auth.controller')(server, chai);
    require('./controllers/feedback.controller')(server, chai);
    require('./controllers/user.controller')(server, chai);
    require('./controllers/webhook.controller')(server, chai);

};