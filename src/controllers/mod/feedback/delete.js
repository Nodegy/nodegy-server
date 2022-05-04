const db = require('../../../models');
const Feedback = db.feedback;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'delete feedback';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const feedbackId = req.params.id;
    let confirm;
    let err;
    try {
        confirm = await Feedback.findByIdAndRemove({ _id: feedbackId });

    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: null,
            eid: eid,
            err: err,
            isErr: err || !confirm ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    };

};