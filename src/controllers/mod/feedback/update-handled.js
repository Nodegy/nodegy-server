const db = require('../../../models');
const Feedback = db.feedback;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'update handled feedback';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const feedbackId = req.body._id;
    let confirm;
    let err;
    try {
        confirm = await Feedback.findByIdAndUpdate(
            { _id: feedbackId },
            { handled: req.body.handled });
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
