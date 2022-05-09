const db = require('../../../models');
const MailingList = db.mailingListEmail;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'add to mailing list';

module.exports = async (req, res) => {
    let err;
    let confirm;
    try {
        const mailingList = new MailingList({
            email: req.body.email
        });
        confirm = await mailingList.save(mailingList);

    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: null,
            eid: null,
            err: err,
            isErr: err ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    };
};