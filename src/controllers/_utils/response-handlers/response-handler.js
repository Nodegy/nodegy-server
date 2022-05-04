const { handleNotifications, handleSse } = require('../notification-handlers/index');
const logger = require('../../../utils/logger/logger');
const { handleInternalError } = require('../../../utils/internal-handlers/index');
const { determineType, generateResponseMessage } = require('./_helpers/index');

module.exports = async (res, { data, eid, err, isErr, message, status, service }) => {
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
        await handleSse(eid, payload, type);
        // await handleNotifications(eid, [payload.details]);
        await res.status(status).send(payload);
    } catch (error) {
        err = error;
        await res.status(status).send({
            message: 'Error: Response Error Handler'
        });
    } finally {
        const loggerMsg = `status: [${status}] eid: [${eid}] response message: [${responseMsg}]`;
        if (err) {
            handleInternalError({
                message: loggerMsg,
                err: err,
                service: 'Response Handler'
            });
        } else {
            logger.info(loggerMsg)
        };
    };
};