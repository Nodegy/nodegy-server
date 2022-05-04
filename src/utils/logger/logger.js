const { createLogger, transports, format } = require('winston');
const { timestamp, combine, colorize, errors, json, printf } = format;
require('winston-mongodb');
require('dotenv').config();
const dbConfig = require('../../config/db.config.js');

const filePath = './src/utils/logger/logs/';
const logFormat = printf(({ level, message, timestamp, stack }) => {

    return stack ?
        `${timestamp} [${level}: \n\nstack: ${stack}]\n`
        :
        `${timestamp} [${level}: ${message}]`
});

const excFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}: ${stack || message}]\n`;
});

let defineTransports = [
    new transports.Console({
        format: combine(
            colorize(),
            errors({ stack: true }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat
        ),
    }),
];

if (process.env.LOG_TO_FILE === 'true') {
    defineTransports.push(
        new transports.File({
            level: 'error',
            filename: `${filePath}errors.log`,
            format: combine(
                errors({ stack: true }),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            ),
        })
    )
};

if (process.env.LOG_TO_DB === 'true') {
    defineTransports.push(
        new transports.MongoDB({
            level: 'error',
            db: dbConfig.url,
            options: {
                useUnifiedTopology: true,
            },
            collection: 'errorlogs',
            format: combine(
                errors({ stack: true }),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            ),
        })
    )
};

// let buildExceptionHandlers = [
//     new transports.Console({
//         format: combine(
//             colorize(),
//             errors({ stack: true }),
//             timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//             logFormat
//         ),
//     }),
//     new transports.File({
//         filename: `${filePath}exceptions.log`,
//     }),
// ];

// let buildRejectionHandlers = [
//     new transports.File({ filename: `${filePath}rejections.log` }),
// ];

module.exports = createLogger({
    transports: defineTransports,
    // exceptionHandlers: buildExceptionHandlers,
    // rejectionHandlers: buildRejectionHandlers,
});

