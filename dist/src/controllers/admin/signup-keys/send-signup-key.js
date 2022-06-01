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
const SignupKey = db.signupKey;
const { handleResponse } = require('../../_utils/response-handlers/index');
const sendSignupKeyEmail = require('../../../services/email/send-signup-key');
const service = 'send signup key';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    const _id = req.body._id;
    const email = req.body.email;
    const sentKey = req.body.key;
    let err;
    let updatedKey;
    try {
        yield sendSignupKeyEmail(email, sentKey);
        updatedKey = yield SignupKey.findByIdAndUpdate({ _id: _id }, { $set: { isAvailable: false } }, { new: true });
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: updatedKey,
            eid: eid,
            err: err,
            isErr: err || !updatedKey ? true : false,
            status: err ? 500 : updatedKey ? 200 : 400,
            service: service
        });
    }
    ;
});
