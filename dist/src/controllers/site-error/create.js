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
const SiteError = db.siteError;
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'create site error';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteError = new SiteError({
        userId: req.cookies.id,
        service: req.body.service,
        function: req.body.function,
        message: req.body.message,
        payload: req.body.payload,
        stack: req.body.stack
    });
    const eid = req.cookies.eid;
    let confirm;
    let err;
    try {
        confirm = yield siteError.save(siteError);
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: err ? null : confirm,
            eid: eid,
            err: err,
            isErr: err || !confirm ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    }
    ;
});
