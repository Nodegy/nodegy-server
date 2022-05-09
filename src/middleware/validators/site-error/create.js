const { handleResponse } = require('../../../controllers/_utils/response-handlers/index');
const { vRequiredKeys } = require('../_helpers/index');
const service = 'create site error';
const requiredKeys = ['service', 'function', 'message', 'stack'];

module.exports = async (req, res, next) => {
    let valid = true;
    let errMsg = '';
    let validate;

    if (!req.cookies.id) {
        errMsg = 'Invalid cookies. Require id.';
        valid = false;
    };

    if (valid) {
        validate = vRequiredKeys(req.body, requiredKeys);
        if (!validate.isValid) {
            errMsg = validate.msg;
            valid = false;
        };
    };

    if (valid) {
        validate = Object.keys(req.body).every(key => typeof key === 'string');
        if (!validate) {
            errMsg = 'Value types failed.';
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