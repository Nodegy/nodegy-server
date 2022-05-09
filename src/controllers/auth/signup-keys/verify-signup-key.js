const db = require('../../../models');
const SignupKey = db.signupKey;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'verify signup key';

module.exports = async (req, res) => {
    let err;
    let resMsg;
    try {
        const foundKey = await SignupKey.findOne({ key: req.body.key });
        if (!foundKey || foundKey.isUsed) {
            resMsg = 'invalid key';
        };
    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: null,
            eid: null,
            err: err,
            isErr: err || resMsg ? true : false,
            status: err ? 500 : resMsg ? 400 : 200,
            service: service
        });
    };
};