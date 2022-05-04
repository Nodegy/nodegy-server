const db = require('../../../models');
const Alert = db.alert;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'update alert';

module.exports = async (req, res) => {
    const _id = req.body._id;
    const payload = { ...req.body };
    delete payload._id;
    const eid = req.params.eid;
    let confirm;
    let err;
    try {
        confirm = await Alert.findByIdAndUpdate(
            { _id: _id },
            { $set: payload },
            { new: true });
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