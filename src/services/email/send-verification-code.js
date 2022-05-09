const emailService = require('./send-email-service');

module.exports = async (address, vCode) => {
    try {
        const subject = 'Nodegy Verification Code';
        const msgBody = `Verification Code: ${vCode}`;
        const confirm = await emailService(address, subject, msgBody);
        return Promise.resolve(confirm);

    } catch (err) {
        return Promise.reject(err);
    }

};