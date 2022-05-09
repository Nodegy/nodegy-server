const db = require('../../../models');
const User = db.user;
const bcrypt = require('bcrypt');
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'verification reset pw';

module.exports = async (req, res) => {
    let confirm;
    let err;
    let status;

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            err = 'Unable to find user';
            status = 404;
        };
        if (!err) {
            const vCode = user.vCode;
            if (vCode != req.body.vCode) {
                err = 'invalid verification code';
                status = 400;
            };
        };
        if (!err) {
            confirm = await User.findByIdAndUpdate(user._id, { password: bcrypt.hashSync(req.body.password, 1), });
        };

    } catch (error) {
        err = error;
        status = 500;
    } finally {
        await handleResponse(res, {
            data: null,
            eid: null,
            err: err,
            isErr: err || !confirm ? true : false,
            status: status ? status : 200,
            service: service
        });
    };
};