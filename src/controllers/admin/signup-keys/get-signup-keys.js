const db = require('../../../models');
const SignupKey = db.signupKey;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'get signup keys';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let err;
    let allKeys;
    try {
        allKeys = await SignupKey.find();
    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: allKeys,
            eid: eid,
            err: err,
            isErr: err || !allKeys ? true : false,
            status: err ? 500 : allKeys ? 200 : 400,
            service: service
        });
    };
};