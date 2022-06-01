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
const SignupKey = db.signupKey;
const { handleResponse } = require('../../controllers/_utils/response-handlers/index');
const serverConfig = require('../../server-config');
const service = 'verify signup key';
const signupKeyRequired = serverConfig.REQUIRE_SIGNUP_KEY;
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (signupKeyRequired) {
            const key = req.body.key;
            const found = yield SignupKey.findOne({
                key: key
            });
            if (!found || found.isUsed) {
                yield handleResponse(res, {
                    data: null,
                    eid: null,
                    err: 'invalid key',
                    isErr: true,
                    status: 400,
                    service: service
                });
                return;
            }
            ;
            yield SignupKey.findByIdAndUpdate({ _id: found._id }, { $set: { isUsed: true } }, { new: true });
        }
        ;
        next();
    }
    catch (err) {
        res.status(500).send({
            message: `Action: Verify signup key. Error: ${err}`
        });
    }
    ;
});
