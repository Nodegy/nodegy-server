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
const db = require('../../models');
const PreUser = db.preUser;
const User = db.user;
const Role = db.role;
const SignupKey = db.signupKey;
const jwt = require('jsonwebtoken');
const { genVCode } = require('../../services/generators/index');
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'Confirm Signup';
const serverConfig = require('../../server-config');
const signupKeyRequired = serverConfig.REQUIRE_SIGNUP_KEY;
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let confirm;
    let err;
    let payload;
    let preUser;
    let user;
    try {
        preUser = yield PreUser.findOne({ email: req.body.email, vCode: req.body.vCode });
        if (!preUser) {
            err = 'Invalid Email or Verification Code';
        }
        ;
        if (!err) {
            const role = yield Role.findOne({ name: 'user' });
            const eid = yield createEid();
            user = new User({
                eid: eid,
                email: preUser.email,
                password: preUser.password,
                preferences: {
                    timezone: req.body.timezone,
                    timeFormat: 24,
                    theme: 'white'
                },
                roles: [role.id],
                username: preUser.username,
                vCode: genVCode()
            });
            confirm = yield user.save(user);
            let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 3 * 24 * 60 * 60 * 1000,
            });
            const cookieParams = {
                maxAge: 3 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
                path: '/',
                secure: true,
                httpOnly: true
            };
            res.cookie('accessToken', token, cookieParams);
            res.cookie('id', user._id, cookieParams);
            res.cookie('eid', user.eid, cookieParams);
            payload = generatePayload(user);
        }
        ;
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: err ? null : payload,
            eid: null,
            err: err,
            isErr: err || !confirm ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
        yield onConfirm(preUser, confirm, signupKeyRequired ? req.body.key : null);
    }
    ;
});
const createEid = () => __awaiter(void 0, void 0, void 0, function* () {
    let eidCheck = null;
    let eid;
    while (true) {
        eid = db.mongoose.Types.ObjectId();
        eidCheck = yield User.findOne({ eid: eid });
        if (!eidCheck) {
            break;
        }
        ;
    }
    ;
    return eid;
});
const generatePayload = (user) => {
    return {
        user: {
            username: user.username,
            email: user.email,
            roles: ['user'],
        },
        preferences: user.preferences,
    };
};
const onConfirm = (preUser, user, signupKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (signupKey) {
            yield SignupKey.findOneAndUpdate({ key: signupKey }, { $set: { isUsed: true } });
        }
        ;
        if (preUser && user) {
            yield PreUser.deleteMany({
                $or: [
                    { email: preUser.email },
                    { username: preUser.username }
                ]
            });
        }
        ;
    }
    catch (err) {
        console.log('err onConfirm: ', err);
    }
    ;
});
