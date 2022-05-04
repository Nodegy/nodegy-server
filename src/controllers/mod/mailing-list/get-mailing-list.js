const db = require('../../../models');
const MailingList = db.mailingListEmail;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = "get signup keys";

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let err;
    let mailingList;
    try {
        mailingList = await MailingList.find();
    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: mailingList,
            eid: eid,
            err: err,
            isErr: err || !mailingList ? true : false,
            status: err ? 500 : mailingList ? 200 : 400,
            service: service
        });
    };
};

