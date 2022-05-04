const db = require('../../../models');
const Webhook = db.webhook;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = "mod create incoming webhook";

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let confirm;
    let err;
    try {
        const webhook = new Webhook({
            eid: req.cookies.eid,
            ...req.body,
        });
        confirm = await webhook.save(webhook);
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