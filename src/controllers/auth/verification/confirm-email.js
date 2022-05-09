const db = require('../../../models');
const User = db.user;
const Role = db.role;
const { genVCode } = require('../../../services/generators/index');
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'verification confirm email';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let bodyRoles = req.body.roles;
    let confirm;
    let err;
    try {
        if (!bodyRoles.includes('isConfirmed')) {
            const user = await User.findById(req.cookies.id);
            if (req.body.vCode !== user.vCode) {
                err = 'Invalid Code';
            };
            if (!err) {
                bodyRoles.push('isConfirmed');
                const roles = await Role.find({ name: { $in: bodyRoles } });
                const updatedRoles = roles.map(role => role._id);
                confirm = await User.findByIdAndUpdate(
                    { _id: req.cookies.id },
                    { $set: { roles: updatedRoles, vCode: genVCode() } },
                    { new: true });
            };
        };
    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: err ? null : bodyRoles,
            eid: eid,
            err: err,
            isErr: err || !confirm ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    };
};