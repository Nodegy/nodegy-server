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
const logger = require('../../../utils/logger');
const { handleInternalError } = require('../../../utils/internal-handlers/index');
module.exports = (res, { service, status }) => __awaiter(void 0, void 0, void 0, function* () {
    let err;
    try {
        yield res.status(status).send({ message: 'request received' });
    }
    catch (error) {
        yield res.status(status).send({
            message: 'Error: External Request Response Error Handler'
        });
        err = error;
    }
    finally {
        const loggerMsg = `Service: [${service}] - external request received.  Response status: [${status}]`;
        if (err) {
            handleInternalError({
                message: loggerMsg,
                err: err,
                service: 'External Request Response Handler'
            });
        }
        else {
            logger.info(loggerMsg);
        }
    }
});
