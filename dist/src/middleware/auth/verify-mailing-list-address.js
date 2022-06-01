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
const MailingList = db.mailingListEmail;
const { handleResponse } = require('../../controllers/_utils/response-handlers/index');
const service = 'verify mailing list address';
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const found = yield MailingList.findOne({
            email: email
        });
        if (found) {
            yield handleResponse(res, {
                data: null,
                eid: null,
                err: 'Email is already on the mailing list.',
                isErr: true,
                status: 400,
                service: service
            });
            return;
        }
        ;
        next();
    }
    catch (err) {
        res.status(500).send({
            message: `Action: Check duplicate email. Error: ${err}`
        });
    }
    ;
});
