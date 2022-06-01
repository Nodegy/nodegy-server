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
const nodemailer = require('nodemailer');
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
module.exports = (address, subject, body) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: process.env.FROM_EMAIL_ADDRESS,
        to: address,
        subject: subject,
        text: body
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return reject(false);
            }
            else {
                return resolve(true);
            }
        });
    });
});
