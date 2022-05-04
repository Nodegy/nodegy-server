const logger = require('../logger/logger');

module.exports = async () => {
    logger.info('Maintenance:');

    logger.info(`CLEAR_LOGS_MAINTENANCE: ${process.env.CLEAR_LOGS_MAINTENANCE}`);
    if (process.env.CLEAR_LOGS_MAINTENANCE === 'true') {
        const clearLogs = require('./clear-logs')(logger);
        await clearLogs;
    };

    logger.info(`DB_MAINTENANCE: ${process.env.DB_MAINTENANCE}`);
    if (process.env.DB_MAINTENANCE === 'true') {
        const updateDbModels = require('./update-db-models')(logger);
        await updateDbModels();
    };

    logger.info("Maintenance complete");

};
