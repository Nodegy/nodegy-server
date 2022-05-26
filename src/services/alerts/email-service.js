const { handleInternalError } = require('../../utils/internal-handlers/index');
const emailService = require('../email/send-email-service');

module.exports = async (symbol, name, posAction, message, address, currentTime) => {
    try {
        const subject = `Nodegy Alert! Strategy: ${name}, Symbol: ${symbol}`;
        const msgBody = `Strategy: ${name}\nAction: ${posAction}\nSymbol: ${symbol}\nDate/Time: ${currentTime}\nMessage: ${message}`;
        const confirm = await emailService(address, subject, msgBody);
        if (confirm) {
            return Promise.resolve(confirm);
        };

    } catch (err) {
        handleInternalError({
            message: 'Error in Email Service',
            err: err,
            service: 'Email Service'
        });
    };

};

