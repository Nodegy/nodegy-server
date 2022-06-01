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
const { genVCode } = require('../../../services/generators/index');
const sendVEmailService = require('../../../services/email/send-verification-code');
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'verification send pw reset v code';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let confirm;
    let err;
    let status;
    try {
        const vCode = genVCode();
        const email = req.body.email;
        const user = yield User.findOneAndUpdate({ email: email }, { vCode: vCode });
        if (!user) {
            err = 'invalid email address';
            status = 400;
        }
        ;
        if (!err) {
            confirm = yield sendVEmailService(email, vCode);
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
            isErr: err || !confirm ? true : false,
            status: status ? status : 200,
            service: service
        });
    }
    ;
});
