const emailService = require('./send-email-service');

module.exports = async (address, signupKey) => {
    try {
        const subject = 'Nodegy Signup Key';
        const msgBody = `Beta Signup Key: ${signupKey}`;
        const confirm = await emailService(address, subject, msgBody);
        return Promise.resolve(confirm);
    } catch (err) {
        return Promise.reject(err);
    };
};