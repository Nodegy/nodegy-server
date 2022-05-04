const db = require("../../models");
const MailingList = db.mailingListEmail;
const { handleResponse } = require('../../controllers/_utils/response-handlers/index');
const service = 'verify mailing list address';

module.exports = async (req, res, next) => {
    try {
        const email = req.body.email;
        const found = await MailingList.findOne({
            email: email
        });
        if (found) {
            await handleResponse(res, {
                data: null,
                eid: null,
                err: "Email is already on the mailing list.",
                isErr: true,
                status: 400,
                service: service
            });
            return;
        };
        next();
    } catch (err) {
        res.status(500).send({
            message: `Action: Check duplicate email. Error: ${err}`
        })
    };

};
