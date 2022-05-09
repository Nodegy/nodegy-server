const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = async (address, subject, body) => {
    try {
        const mailOptions = {
            from: process.env.FROM_EMAIL_ACCOUNT,
            to: address,
            subject: subject,
            text: body
        };

        const confirm = await transporter.sendMail(mailOptions);
        return Promise.resolve(confirm);

    } catch (err) {
        return Promise.reject(err);
    };

};
