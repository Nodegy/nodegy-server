const TestHandler = require('../../test-handler');
const sendEmailService = require('../../../src/services/email/send-email-service');
const nodemailer = require('nodemailer');
const logger = require('../../../src/utils/logger');
const service = 'sendEmailService';


const transporter = nodemailer.createTransport({
    pool: process.env.EMAIL_POOL,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
        user: process.env.FROM_EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

const verifyConnection = async () => {
    return new Promise((resolve, reject) => {
        transporter.verify(function (err, suc) {
            if (err) {
                logger.error('verifyConnection error: ', err);
                return resolve(false);
            } else {
                return resolve(true);
            };
        });
    });
};

const sendTestEmail = async () => {
    try {
        let testPassed = await sendEmailService(process.env.TEST_EMAIL_ADDRESS, 'test email', 'Test email sent from Nodegy for server startup.');
        if (testPassed) {
            return true;
        };
    } catch (err) {
        logger.error('sendTestEmail error', err);
    };
};

module.exports = async () => {
    await TestHandler.runTest(service, 'verifyConnection', verifyConnection);
    await TestHandler.runTest(service, 'sendTestEmail', sendTestEmail);
};









