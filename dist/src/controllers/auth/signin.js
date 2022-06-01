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
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { notificationsStoreLoader, stratStoreLoader } = require('../loaders/index');
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'Signin';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let eid;
    let err;
    let payload;
    let status;
    try {
        const user = yield User.findOne({
            $or: [
                { username: req.body.usernameOrEmail },
                { email: req.body.usernameOrEmail }
            ]
        }).populate('roles', '-__v');
        if (!user) {
            err = 'user not found';
            status = 404;
        }
        ;
        if (!err) {
            eid = user.eid;
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                err = 'invalid password';
                status = 401;
            }
            ;
        }
        ;
        if (!err) {
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 3 * 24 * 60 * 60 * 1000,
            });
            payload = yield generatePayload(user);
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
        }
        ;
    }
    catch (error) {
        err = error;
        status = 500;
    }
    finally {
        yield handleResponse(res, {
            data: err ? null : payload,
            eid: eid,
            err: err,
            isErr: err ? true : false,
            status: status ? status : 200,
            service: service
        });
    }
    ;
});
const generatePayload = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name);
    }
    return {
        user: {
            username: user.username,
            email: user.email,
            roles: authorities,
        },
        preferences: {
            timezone: user.preferences.timezone || null,
            timeFormat: user.preferences.timeFormat || null,
            theme: user.preferences.theme || null,
        },
        stratStore: yield stratStoreLoader(user.eid),
        notifications: yield notificationsStoreLoader(user.eid)
    };
});
