const db = require('../../models');
const SignupKey = db.signupKey;
const { handleResponse } = require('../../controllers/_utils/response-handlers/index');
const serverConfig = require('../../server-config');
const service = 'verify signup key';
const signupKeyRequired = serverConfig.REQUIRE_SIGNUP_KEY;

module.exports = async (req, res, next) => {
    try {
        if (signupKeyRequired) {
            const key = req.body.key;
            const found = await SignupKey.findOne({
                key: key
            });
            if (!found || found.isUsed) {
                await handleResponse(res, {
                    data: null,
                    eid: null,
                    err: 'invalid key',
                    isErr: true,
                    status: 400,
                    service: service
                });
                return;
            };
            await SignupKey.findByIdAndUpdate(
                { _id: found._id },
                { $set: { isUsed: true } },
                { new: true });
        };
        next();
    } catch (err) {
        res.status(500).send({
            message: `Action: Verify signup key. Error: ${err}`
        });
    };

};
