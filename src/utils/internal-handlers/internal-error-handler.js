const logger = require('../logger/logger');

module.exports = ({ message, err, service }) => {
    let msg = `[ service: ${service} ]`;
    msg += message ? `[ message: ${message} ] ` : '';
    msg += `[ err: [ ${err} ] ]`;

    logger.error(msg, err);
};