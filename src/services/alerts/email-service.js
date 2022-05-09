const nodemailer = require('nodemailer');
const { handleInternalError } = require('../../utils/internal-handlers/index');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = async (symbol, name, posAction, message, address) => {
    try {
        const mailOptions = {
            from: process.env.FROM_EMAIL_ACCOUNT,
            to: address,
            subject: `Nodegy Alert! Strategy: ${name}, Symbol: ${symbol}`,
            text: `Strategy: ${name}\nAction: ${posAction}\nSymbol: ${symbol}Message: ${message}`
        };

        await transporter.sendMail(mailOptions);


    } catch (err) {
        handleInternalError({
            message: 'Error in Email Service',
            err: err,
            service: 'Email Service'
        });
    };

};

