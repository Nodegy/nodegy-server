const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const { vKeyValues, vRequiredKeys } = require('../../_helpers/index');
const service = 'create feedback';
const requiredKeys = ['email', 'subject', 'body'];

module.exports = async (req, res, next) => {
    let valid = true;
    let errMsg = '';

    if (!req.cookies.id) {
        errMsg = 'Invalid cookies. Require id.';
        valid = false;
    };

    let validate;

    if (valid) {
        validate = vRequiredKeys(req.body, requiredKeys);
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