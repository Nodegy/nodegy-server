const db = require('../../../models');
const Webhook = db.webhook;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'delete webhook';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const webhookId = req.params.id;
    let err;
    let confirm;
    try {
        confirm = await Webhook.findByIdAndRemove(webhookId);
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