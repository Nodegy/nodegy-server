const db = require('../../../models');
const User = db.user;
const bcrypt = require("bcrypt");
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'mod update user';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const _id = req.body._id;
    const payload = Object.keys(req.body).includes('password') ? {
        password: bcrypt.hashSync(req.body.password, 1)
    } : req.body;
    let confirm;
    let err;
    try {
        confirm = await User.findByIdAndUpdate(_id, payload);
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