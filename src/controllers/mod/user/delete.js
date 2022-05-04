const db = require('../../../models');
const User = db.user;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'mod delete user';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let confirm;
    let err;
    try {
        confirm = await User.findByIdAndRemove(req.params.id);
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
