const db = require('../../../models');
const User = db.user;
const Role = db.role;
const { genVCode } = require("../../../services/generators/index");
const bcrypt = require("bcrypt");
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = "mod create user";

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const vCode = genVCode()
    const user = new User({
        eid: '',
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 1),
        roles: [],
        vCode: vCode,
        preferences: {
            timezone: req.body.timezone,
            timeFormat: 24,
            theme: 'white'
        },
    });
    let eidCheck;
    let confirm;
    let err;
    try {
        while (true) {
            user.eid = db.mongoose.Types.ObjectId();
            eidCheck = await User.findOne({ eid: user.eid });
            if (!eidCheck) {
                break;
            };
        };
        const roles = await Role.find();
        roles.forEach(role => {
            if (role.name === 'user' || role.name === 'isConfirmed') {
                user.roles.push(role._id);
            };
        });
        confirm = await user.save(user);
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