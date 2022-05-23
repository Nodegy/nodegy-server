const { handleResponse } = require('../../../controllers/_utils/response-handlers/index');
const { vKeyValues, vRequiredKeys } = require('../_helpers/index');
const service = 'Signup';
const serverConfig = require('../../../server-config');
const signupKeyRequired = serverConfig.REQUIRE_SIGNUP_KEY;

module.exports = async (req, res, next) => {
    let requiredKeys = ['email', 'password', 'username'];
    let valid = true;
    let errMsg = '';
    let validate;

    if (signupKeyRequired) {
        requiredKeys.push('key');
    };

    validate = vRequiredKeys(req.body, requiredKeys);
    if (!validate.isValid) {
        errMsg = validate.msg;
        valid = false;
    };

    if (valid) {
        validate = vKeyValues(req.body);
        if (!validate.isValid) {
            errMsg = validate.msg;
            valid = false;
        };
    };

    if (!valid) {
        await handleResponse(res, {
            data: null,
            eid: req.cookies.eid,
            err: errMsg,
            isErr: true,
            status: 400,
            service: service
        });
        return;
    };

    next();
};