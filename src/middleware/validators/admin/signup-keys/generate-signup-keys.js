const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const { vKeyValues, vRequiredKeys } = require('../../_helpers/index');
const service = 'Generate Signup Key';
const requiredKeys = ['generateSignupKeys', 'total'];

module.exports = async (req, res, next) => {
    let valid = true;
    let errMsg = '';

    let validate = vRequiredKeys(req.body, requiredKeys);
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

    if (valid) {
        if (req.body.total < 0 || req.body.total > 100) {
            errMsg = 'invalid total';
            valid = false;
        }
    }

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