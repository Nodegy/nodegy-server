const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const { vKeyValues, vRequiredKeys, vAllowedKeys } = require('../../_helpers/index');
const service = "update user";
const requiredKeys = [];
const allowedKeys = ['password', 'email', 'preferences'];

module.exports = async (req, res, next) => {
    let valid = true;
    let errMsg = "";

    let validate = vRequiredKeys(req.body, requiredKeys, allowedKeys);
    if (!validate.isValid) {
        errMsg = validate.msg;
        valid = false;
    };

    if (valid) {
        validate = vAllowedKeys(req.body, allowedKeys);
        if (!validate.isValid) {
            errMsg = validate.msg;
            valid = false;
        };
    };

    if (valid) {
        validate = vKeyValues(req.body);
        if (!validate.isValid) {
            errMsg = validate.msg;
            valid = false;
        };
    };

    if (valid) {
        Object.keys(req.body).forEach(key => {
            if (valid) {
                if (!req.body[key]) {
                    errMsg = 'Invalid';
                    valid = false;
                };
            };
        });
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