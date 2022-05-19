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

module.exports = async (address, subject, body) => {
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
            } else {
                return resolve(true)
            }
        });
    });
};