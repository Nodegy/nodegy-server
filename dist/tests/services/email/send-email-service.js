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
const verifyConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        transporter.verify(function (err, suc) {
            if (err) {
                logger.error('verifyConnection error: ', err);
                return resolve(false);
            }
            else {
                return resolve(true);
            }
            ;
        });
    });
});
const sendTestEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let testPassed = yield sendEmailService(process.env.TEST_EMAIL_ADDRESS, 'test email', 'Test email sent from Nodegy for server startup.');
        if (testPassed) {
            return true;
        }
        ;
    }
    catch (err) {
        logger.error('sendTestEmail error', err);
    }
    ;
});
module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    yield TestHandler.runTest(service, 'verifyConnection', verifyConnection);
    yield TestHandler.runTest(service, 'sendTestEmail', sendTestEmail);
});
