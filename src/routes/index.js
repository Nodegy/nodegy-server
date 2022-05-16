module.exports = (app) => {
    const allowedOrigins = [
        process.env.LOCAL_ORIGIN, process.env.DEV_ORIGIN, process.env.PROD_ORIGIN
    ];



    app.use(function (req, res, next) {
        let allowedOrigin;
        const incomingHost = req.headers.origin;
        const originAllowed = allowedOrigins.includes(incomingHost);

        console.log('\n\n\nNEW REQ: ', req.headers.origin)
        if (originAllowed) {
            console.log('ORIGIN ALLOWED')
            allowedOrigin = incomingHost;
        } else {
            console.log('ORIGIN NOT ALLOWED')
        };

        res.set('Access-Control-Allow-Origin', process.env.PROD_ORIGIN);
        res.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PATCH', 'DELETE')
        res.set(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
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