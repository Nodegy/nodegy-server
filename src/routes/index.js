module.exports = (app) => {
    app.use(function (req, res, next) {
        res.set('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? process.env.PROD_ORIGIN : process.env.LOCAL_ORIGIN,);
        res.set(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept, Set-Cookie'
        );
        res.set('Access-Control-Allow-Credentials', true);
        next();
    });

    require('./admin/role-routes')(app);
    require('./admin/signup-key-routes')(app);

    require('./auth/auth-routes')(app);
    require('./auth/signup-key-routes')(app);
    require('./auth/verification-routes')(app);
    require('./auth/mailing-list-routes')(app);

    require('./mod/feedback-routes')(app);
    require('./mod/user-routes')(app);
    require('./mod/webhook-routes')(app);
    require('./mod/mailing-list-routes')(app);

    require('./notification/notification-routes')(app);

    require('./site-error/site-error-routes')(app);
    require('./sse/sse-routes')(app);

    require('./user/alert-routes')(app);
    require('./user/feedback-routes')(app);
    require('./user/load-routes')(app);
    require('./user/strategy-routes')(app);
    require('./user/user-routes')(app);
    require('./user/webhook-routes')(app);

};