const { handleResponse } = require('../../../controllers/_utils/response-handlers/index');
const { vKeyValues, vRequiredKeys } = require('../_helpers/index');
const service = 'Signup';
const serverConfig = require('../../../server-config');
const frontEndIsBeta = serverConfig.FRONT_END_BETA_SIGNUPS == 'true';

module.exports = async (req, res, next) => {
    const requiredKeys = ['username', 'email', 'password', 'timezone'];
    let valid = true;
    let errMsg = '';
    let validate;

    if (frontEndIsBeta) {
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