const db = require("../../../models");
const User = db.user;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = "verification check email exists";

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let confirm;
    let err;
    try {
        confirm = await User.findOne({ email: req.body.email });
    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: null,
            eid: eid,
            err: 'Email does not exist',
            isErr: user ? false : true,
            keys: Object.keys(req.body),
            status: user ? 200 : 400,
            service: service
        });
    };
};