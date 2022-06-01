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
const PreUser = db.preUser;
const { genVCode } = require('../../../services/generators/index');
const sendVEmailService = require('../../../services/email/send-verification-code');
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'verification send verification email';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    const vCode = genVCode();
    const oldEmail = req.body.oldEmail;
    const newEmail = req.body.email;
    let confirm;
    let status;
    let err;
    try {
        const user = yield PreUser.updateOne({ email: oldEmail }, { vCode: vCode, email: newEmail });
        if (!user) {
            err = 'invalid email address';
            status = 400;
        }
        ;
        if (!err) {
            confirm = yield sendVEmailService(newEmail, vCode);
        }
        ;
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: null,
            eid: eid,
            err: err,
            isErr: err || !confirm ? true : false,
            status: status ? status : 200,
            service: service
        });
    }
    ;
});
