const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const { vKeyValues, vRequiredKeys } = require('../../_helpers/index');
const service = "create strategy";
const requiredKeys = ['activeStratData', 'alerts', 'conditionsReady', 'name', 'notes', 'stratData', 'symbol'];

module.exports = async (req, res, next) => {
    let valid = true;
    let errMsg = "";
    let validate;

    if (!req.cookies.eid) {
        errMsg = "Invalid cookies. Require eid.";
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