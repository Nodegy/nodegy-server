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
const Webhook = db.webhook;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'mod find all webhooks';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    let webhooks;
    let err;
    try {
        webhooks = yield Webhook.find();
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: err ? null : webhooks,
            eid: eid,
            err: err,
            isErr: err || !webhooks ? true : false,
            status: err ? 500 : webhooks ? 200 : 404,
            service: service
        });
    }
    ;
});
