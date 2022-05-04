const logger = require('../../../utils/logger/logger');
const { handleInternalError } = require('../../../utils/internal-handlers/index');

module.exports = async (res, { service, status }) => {
    let err;
    try {
        await res.status(status).send({ message: 'request received' });
    } catch (error) {
        await res.status(status).send({
            message: 'Error: External Request Response Error Handler'
        });
        err = error;
    } finally {
        const loggerMsg = `Service: [${service}] - external request received.  Response status: [${status}]`;
        if (err) {
            handleInternalError({
                message: loggerMsg,
                err: err,
                service: 'External Request Response Handler'
            });
        } else {
            logger.info(loggerMsg)
        };
    };
};