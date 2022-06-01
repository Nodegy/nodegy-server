"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require('../../../models');
const User = db.user;
const Role = db.role;
const { genVCode } = require('../../../services/generators/index');
const bcrypt = require('bcrypt');
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'mod create user';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    const vCode = genVCode();
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
            eidCheck = yield User.findOne({ eid: user.eid });
            if (!eidCheck) {
                break;
            }
            ;
        }
        ;
        const roles = yield Role.find();
        roles.forEach(role => {
            if (role.name === 'user') {
                user.roles.push(role._id);
            }
            ;
        });
        confirm = yield user.save(user);
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: err ? null : confirm,
            eid: eid,
            err: err,
            isErr: err || !confirm ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    }
    ;
});
