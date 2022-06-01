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
const ROLES = db.ROLES;
const User = db.user;
const checkDuplicateUsernameOrEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email ? req.body.email.toLowerCase() : null;
        const username = req.body.username ? req.body.username.toLowerCase() : null;
        const oldEmail = req.body.oldEmail ? req.body.oldEmail.toLowerCase() : null;
        if (oldEmail) {
            if (!email) {
                res.status(400).send({
                    message: 'Missing updated email.'
                });
                return;
            }
            ;
            if (oldEmail === email) {
                next();
                return;
            }
            ;
        }
        ;
        const user = yield User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        if (user) {
            if (user.username.toLowerCase() === username) {
                res.status(400).send({
                    message: 'Username is already in use.'
                });
                return;
            }
            ;
            if (user.email.toLowerCase() === email) {
                res.status(400).send({
                    message: 'Email is already in use.'
                });
                return;
            }
            ;
        }
        ;
        next();
    }
    catch (err) {
        res.status(500).send({
            message: `Action: Check duplicate username or email.  Error: ${err}`
        });
    }
    ;
});
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed. Role ${req.body.roles[i]} does not exist.`
                });
                return;
            }
            ;
        }
        ;
    }
    ;
    next();
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};
module.exports = verifySignUp;
