const logger = require('../logger/logger');
const serverConfig = require('../../server-config');

module.exports = async () => {
    logger.info('Maintenance:');

    logger.info(`CLEAR_LOGS_MAINTENANCE: ${serverConfig.CLEAR_LOGS_MAINTENANCE}`);
    if (serverConfig.CLEAR_LOGS_MAINTENANCE) {
        const clearLogs = require('./clear-logs')(logger);
        await clearLogs;
    };

    logger.info(`DB_MAINTENANCE: ${serverConfig.DB_MAINTENANCE}`);
    if (serverConfig.DB_MAINTENANCE) {
        const updateDbModels = require('./update-db-models')(logger);
        await updateDbModels();
    };

    logger.info('Maintenance complete');

};
