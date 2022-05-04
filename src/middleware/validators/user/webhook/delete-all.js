const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const service = 'delete all webhooks';

module.exports = async (req, res, next) => {
    if (!req.cookies.eid) {
        await handleResponse(res, {
            data: null,
            eid: req.cookies.eid,
            err: 'Cookies check failed. Require eid',
            isErr: true,
            status: 400,
            service: service
        });
        return;
    };
    next();
};