const db = require('../../../models');
const SignupKey = db.signupKey;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = "generate signup keys";
const { genSignupKey } = require('../../../services/generators/index');

module.exports = async (req, res) => {
    const numOfKeys = req.body.total;
    const eid = req.cookies.eid;
    let err;
    let confirm;
    let newKeys = [];
    let signupKey;
    let allKeys;
    try {
        for (let i = 0; i < numOfKeys; i++) {
            signupKey = new SignupKey({
                key: genSignupKey()
            });
            newKeys.push(signupKey);

        };
        confirm = await SignupKey.insertMany(newKeys);

        if (confirm) {
            allKeys = await SignupKey.find();
        };

    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: allKeys,
            eid: eid,
            err: err,
            isErr: err ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    };
};