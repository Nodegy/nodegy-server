const db = require('../../models');
const Notification = db.notification;
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'delete all notifications';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let confirm;
    let err;
    try {
        confirm = await Notification.deleteMany({ eid: eid });
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