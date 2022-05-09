const db = require('../../../models');
const User = db.user;
const Role = db.role;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'update user role';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const id = { _id: req.body._id };
    let confirm;
    let err;
    try {
        const roles = await Role.find({ name: { $in: req.body.roles } });
        const updatedRoles = roles.map(role => role._id);
        confirm = await User.findByIdAndUpdate(id,
            { $set: { 'roles': updatedRoles } });
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