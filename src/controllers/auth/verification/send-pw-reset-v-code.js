const db = require("../../../models");
const User = db.user;
const { genVCode } = require("../../../services/generators/index");
const sendVEmailService = require("../../../services/email/send-verification-code");
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = "verification send pw reset v code";

module.exports = async (req, res) => {
    let confirm;
    let err;
    let status;
    try {
        const vCode = genVCode();
        const email = req.body.email;
        const user = await User.findOneAndUpdate(
            { email: email },
            { vCode: vCode });

        if (!user) {
            err = 'invalid email address';
            status = 400;
        };

        if (!err) {
            confirm = await sendVEmailService(email, vCode);
        };

    } catch (error) {
        err = error;
        status = 500
    } finally {
        await handleResponse(res, {
            data: null,
            eid: null,
            err: err,
            isErr: err || !confirm ? true : false,
            status: status ? status : 200,
            service: service
        });
    };
};