const db = require('../../../models');
const MailingList = db.mailingListEmail;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'delete addresses';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let confirm;
    let err;
    try {
        confirm = await MailingList.deleteMany({
            _id: {
                $in: req.body._ids
            }
        });
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