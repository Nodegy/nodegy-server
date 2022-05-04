const db = require('../../../models');
const Feedback = db.feedback;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'create feedback';

module.exports = async (req, res) => {
    const feedback = new Feedback({
        userId: req.cookies.id,
        email: req.body.email,
        subject: req.body.subject,
        body: req.body.body
    });
    const eid = req.cookies.eid;
    let confirm;
    let err;
    try {
        confirm = await feedback.save(feedback);

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