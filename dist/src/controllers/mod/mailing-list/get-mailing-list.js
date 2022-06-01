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
const service = 'get signup keys';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    let err;
    let mailingList;
    try {
        mailingList = yield MailingList.find();
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: mailingList,
            eid: eid,
            err: err,
            isErr: err || !mailingList ? true : false,
            status: err ? 500 : mailingList ? 200 : 400,
            service: service
        });
    }
    ;
});
