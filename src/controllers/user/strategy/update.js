const db = require('../../../models');
const Strategy = db.strategy;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'update strategy';

module.exports = async (req, res) => {
    const _id = req.body._id;
    const eid = req.cookies.eid;
    const payload = { ...req.body };
    delete payload._id;
    let confirm;
    let err;
    try {
        confirm = await Strategy.findByIdAndUpdate(
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
    }
};