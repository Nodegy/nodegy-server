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
const Alert = db.alert;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'create alert';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    const alert = new Alert({
        address: req.body.address,
        eid: eid,
        messages: req.body.messages,
        name: req.body.name,
        notes: req.body.notes,
        type: req.body.type,
    });
    let confirm;
    let err;
    try {
        confirm = yield alert.save(alert);
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
