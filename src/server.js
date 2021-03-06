const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger');
const helmet = require('helmet');
const { handleInternalError } = require('./utils/internal-handlers/index');

const initServer = async () => {
    const app = express();
    const origin = process.env.NODE_ENV === 'production' ? process.env.PROD_ORIGIN : process.env.LOCAL_ORIGIN
    const corsOptions = {
        credentials: true,
        origin: origin,
        methods: ['GET', 'PATCH', 'POST', 'DELETE'],
        "preflightContinue": true,
        "optionsSuccessStatus": 204
    };

    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use(helmet());

    require('dotenv').config();

    app.get('/', (req, res) => {
        res.json({ message: `Welcome to Nodegy.` });
    });

    const db = require('./models');
    logger.info(`Node Environment: ${process.env.NODE_ENV}`);
    logger.info(`Origin: ${origin}`)
    try {
        const connected = await db.mongoose
            .connect(db.url, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });

        if (connected) {
            logger.info('Connected to the database.');
        }
    } catch (err) {
        handleInternalError({
            message: 'Cannot connect to the database',
            err: err,
            service: 'Server'
        });
        process.exit();
    }

    require('./routes/index')(app);

    const PORT = process.env.PORT || 3000;

    try {
        const appListen = await app.listen(PORT);
        if (appListen) {
            logger.info(`Server is running on port ${PORT}`);
        }

    } catch (err) {
        handleInternalError({
            message: 'Cannot connect to the server',
            err: err,
            service: 'Server'
        });
        process.exit();
    }

    const initializeRolesInDb = (require('./services/roles/init-roles-in-db'));

    initializeRolesInDb();

    const runMaintenance = require('./utils/maintenance/index');
    await runMaintenance();

    const tests = require('../tests');
    const testsPassed = await tests();
    if (!testsPassed) {
        logger.error('Tests Failed, exiting.');
        process.exit();
    };
    logger.info('Ready...')
};

initServer();
