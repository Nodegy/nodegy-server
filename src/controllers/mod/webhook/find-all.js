const db = require('../../../models');
const Webhook = db.webhook;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'mod find all webhooks';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let webhooks;
    let err;
    try {
        webhooks = await Webhook.find();
    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: err ? null : webhooks,
            eid: eid,
            err: err,
            isErr: err || !webhooks ? true : false,
            status: err ? 500 : webhooks ? 200 : 404,
            service: service
        });
    };
};


