const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const service = 'delete alert';

module.exports = async (req, res, next) => {
    if (!req.params.id) {
        await handleResponse(res, {
            data: null,
            eid: req.cookies.eid,
            err: 'Params check failed. Require id',
            isErr: true,
            status: 400,
            service: service
        });
        return;
    };
    next();
};