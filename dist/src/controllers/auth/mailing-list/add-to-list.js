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
const MailingList = db.mailingListEmail;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'add to mailing list';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let err;
    let confirm;
    try {
        const mailingList = new MailingList({
            email: req.body.email
        });
        confirm = yield mailingList.save(mailingList);
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: null,
            eid: null,
            err: err,
            isErr: err ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    }
    ;
});
