const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const service = 'delete user';

module.exports = async (req, res, next) => {
    let valid = true;
    let errMsg = '';

    if (!req.cookies.id || !req.cookies.eid) {
        errMsg = 'Cookies check failed.  Require id, eid.';
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

