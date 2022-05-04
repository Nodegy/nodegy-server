const { handleResponse } = require('../../../controllers/_utils/response-handlers/index');
const service = "delete all notifications";

module.exports = async (req, res, next) => {
    if (!req.cookies.eid) {
        const errMsg = "Invalid cookies. Require eid.";
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