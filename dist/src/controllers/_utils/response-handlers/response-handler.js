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
const { handleNotifications, handleSse } = require('../notification-handlers/index');
const logger = require('../../../utils/logger');
const { handleInternalError } = require('../../../utils/internal-handlers/index');
const { determineType, generateResponseMessage } = require('./_helpers/index');
module.exports = (res, { data, eid, err, isErr, message, status, service }) => __awaiter(void 0, void 0, void 0, function* () {
    const type = determineType(service);
    const responseMsg = message ? message : generateResponseMessage(service, isErr, err);
    const payload = {
        details: {
            message: responseMsg,
            service: service,
            success: !isErr,
            type: type
        },
        payload: data
    };
    try {
        yield handleSse(eid, payload, type);
        // await handleNotifications(eid, [payload.details]);
        yield res.status(status).send(payload);
    }
    catch (error) {
        err = error;
        yield res.status(status).send({
            message: 'Error: Response Error Handler'
        });
    }
    finally {
        const loggerMsg = `status: [${status}] eid: [${eid}] response message: [${responseMsg}]`;
        if (err) {
            handleInternalError({
                message: loggerMsg,
                err: err,
                service: 'Response Handler'
            });
        }
        else {
            logger.info(loggerMsg);
        }
        ;
    }
    ;
});
