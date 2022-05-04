const db = require("../../../models");
const User = db.user;
const { genVCode } = require("../../../services/generators/index");
const sendVEmailService = require("../../../services/email/send-verification-code");
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = "verification send verification email";

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const vCode = genVCode();
    const oldEmail = req.body.oldEmail
    const newEmail = req.body.email;
    let confirm;
    let status;
    let err;
    try {

        const user = await User.updateOne(
            { email: oldEmail },
            { vCode: vCode, email: newEmail });

        if (!user) {
            err = 'invalid email address';
            status = 400;
        };

        if (!err) {
            confirm = await sendVEmailService(newEmail, vCode);
        };

    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: null,
            eid: eid,
            err: err,
            isErr: err || !confirm ? true : false,
            status: status ? status : 200,
            service: service
        });
    };
};