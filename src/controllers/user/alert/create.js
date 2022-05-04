const db = require('../../../models');
const Alert = db.alert;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'create alert';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const alert = new Alert({
        address: req.body.address,
        eid: eid,
        messages: req.body.messages,
        name: req.body.name,
        notes: req.body.notes,
        type: req.body.type,
    });
    let confirm;
    let err;
    try {
        confirm = await alert.save(alert);
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