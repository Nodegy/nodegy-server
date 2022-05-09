const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const { vKeyValues, vRequiredKeys } = require('../../_helpers/index');
const service = 'Verification Confirm Email';

module.exports = async (req, res, next) => {
    let valid = true;
    let errMsg = '';

    if (!req.cookies.id) {
        errMsg = 'Invalid cookies. Require id.';
        valid = false;
    };

    if (valid
        && (!Object.keys(req.body).includes('roles')
            || !Object.keys(req.body).includes('vCode'))) {
        errMsg = 'Failed key check.  Require roles, vCode';
        valid = false;
    };

    if (valid
        && (!Array.isArray(req.body.roles)
            || !req.body.roles.every(item => typeof item === 'string')
            || !typeof req.body.vCode === 'string')) {
        errMsg = 'Failed type check.  Require roles array with strings.';
        valid = false;
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