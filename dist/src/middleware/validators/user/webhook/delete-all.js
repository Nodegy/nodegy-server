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
const { handleResponse } = require('../../../../controllers/_utils/response-handlers/index');
const service = 'delete all webhooks';
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.eid) {
        yield handleResponse(res, {
            data: null,
            eid: req.cookies.eid,
            err: 'Cookies check failed. Require eid',
            isErr: true,
            status: 400,
            service: service
        });
        return;
    }
    ;
    next();
});