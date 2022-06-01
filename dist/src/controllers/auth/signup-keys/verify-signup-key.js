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
const service = 'verify signup key';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let err;
    let resMsg;
    try {
        const foundKey = yield SignupKey.findOne({ key: req.body.key });
        if (!foundKey || foundKey.isUsed) {
            resMsg = 'invalid key';
        }
        ;
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: null,
            eid: null,
            err: err,
            isErr: err || resMsg ? true : false,
            status: err ? 500 : resMsg ? 400 : 200,
            service: service
        });
    }
    ;
});
