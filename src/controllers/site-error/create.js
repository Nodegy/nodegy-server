const db = require('../../models');
const SiteError = db.siteError;
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'create site error';

module.exports = async (req, res) => {
    const siteError = new SiteError({
        userId: req.cookies.id,
        service: req.body.service,
        function: req.body.function,
        message: req.body.message,
        stack: req.body.stack
    });
    const eid = req.cookies.eid;
    let confirm;
    let err;
    try {
        confirm = await siteError.save(siteError);
    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: err ? null : confirm,
            eid: eid,
            err: err,
            isErr: err || !confirm ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    };
};