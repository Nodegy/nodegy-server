const db = require('../../../models');
const SignupKey = db.signupKey;
const { handleResponse } = require('../../_utils/response-handlers/index');
const sendSignupKeyEmail = require('../../../services/email/send-signup-key');
const service = 'send signup key';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const _id = req.body._id;
    const email = req.body.email;
    const sentKey = req.body.key;
    let err;
    let updatedKey;
    try {
        await sendSignupKeyEmail(email, sentKey);

        updatedKey = await SignupKey.findByIdAndUpdate(
            { _id: _id },
            { $set: { isAvailable: false } },
            { new: true });

    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: updatedKey,
            eid: eid,
            err: err,
            isErr: err || !updatedKey ? true : false,
            status: err ? 500 : updatedKey ? 200 : 400,
            service: service
        });
    };
};