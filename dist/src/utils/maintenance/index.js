"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logger = require('../logger/logger');
const serverConfig = require('../../server-config');
module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Maintenance:');
    logger.info(`CLEAR_LOGS_MAINTENANCE: ${serverConfig.CLEAR_LOGS_MAINTENANCE}`);
    if (serverConfig.CLEAR_LOGS_MAINTENANCE) {
        const clearLogs = require('./clear-logs')(logger);
        yield clearLogs;
    }
    ;
    logger.info(`DB_MAINTENANCE: ${serverConfig.DB_MAINTENANCE}`);
    if (serverConfig.DB_MAINTENANCE) {
        const updateDbModels = require('./update-db-models')(logger);
        yield updateDbModels();
    }
    ;
    logger.info('Maintenance complete');
});
