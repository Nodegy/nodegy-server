const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const { vKeyValues, vRequiredKeys } = require('../../_helpers/index');
const service = 'update handled feedback';
const requiredKeys = ['_id', 'handled'];

module.exports = async (req, res, next) => {
    let valid = true;
    let errMsg = '';

    if (!Object.keys(req.body).includes('_id') || typeof req.body._id === 'string') {
        errMsg = 'Invalid _id. Require id, string.';
        valid = false;
    };

    if (valid && !Object.keys(req.body).includes('handled') || typeof req.body.handled === 'boolean') {
        errMsg = 'Invalid key. Require handled, boolean.';
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