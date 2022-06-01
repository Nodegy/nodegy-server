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
const Strategy = db.strategy;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'delete strategy';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    let confirm;
    let err;
    try {
        confirm = yield Strategy.findByIdAndRemove(req.params.id);
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
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    }
    ;
});