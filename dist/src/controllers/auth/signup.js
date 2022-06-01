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
const bcrypt = require('bcrypt');
const { genVCode } = require('../../services/generators/index');
const sendVerificationEmail = require('../../services/email/send-verification-code');
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'Signup';
const serverConfig = require('../../server-config');
const signupKeyRequired = serverConfig.REQUIRE_SIGNUP_KEY;
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let confirm;
    let err;
    let status;
    try {
        if (signupKeyRequired) {
            yield PreUser.deleteMany({ key: req.body.key });
        }
        ;
        const vCode = genVCode();
        const preUser = new PreUser({
            email: req.body.email,
            key: signupKeyRequired ? req.body.key : null,
            password: bcrypt.hashSync(req.body.password, 1),
            username: req.body.username,
            vCode: vCode,
        });
        const confirmPreUser = yield preUser.save(preUser);
        if (!confirmPreUser) {
            err = 'user not saved';
            status = 400;
        }
        ;
        if (!err) {
            confirm = true;
            confirm = yield sendVerificationEmail(preUser.email, vCode);
        }
        ;
    }
    catch (error) {
        err = error;
        status = 500;
    }
    finally {
        yield handleResponse(res, {
            data: null,
            eid: null,
            err: err,
            isErr: err ? true : false,
            status: status ? status : 200,
            service: service
        });
    }
    ;
});
