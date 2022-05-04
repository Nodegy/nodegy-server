const db = require('../../../models');
const User = db.user;
const bcrypt = require("bcrypt");
const { handleResponse } = require('../../_utils/response-handlers/index');

module.exports = async (req, res) => {
    let service = 'update user';
    const _id = req.cookies.id;
    const eid = req.cookies.eid;
    let confirm;
    let err;
    const bodyKeys = Object.keys(req.body);

    service += ' ' + bodyKeys.join(', ');
    const payload = bodyKeys.includes('password') ?
        { password: bcrypt.hashSync(req.body.password, 1) }
        : req.body;

    try {
        confirm = await User.findByIdAndUpdate(_id, payload);
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