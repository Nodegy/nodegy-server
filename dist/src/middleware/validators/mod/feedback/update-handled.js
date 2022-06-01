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
const { vKeyValues, vRequiredKeys } = require('../../_helpers/index');
const service = 'update handled feedback';
const requiredKeys = ['_id', 'handled'];
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let valid = true;
    let errMsg = '';
    if (!Object.keys(req.body).includes('_id') || typeof req.body._id === 'string') {
        errMsg = 'Invalid _id. Require id, string.';
        valid = false;
    }
    ;
    if (valid && !Object.keys(req.body).includes('handled') || typeof req.body.handled === 'boolean') {
        errMsg = 'Invalid key. Require handled, boolean.';
        valid = false;
    }
    ;
    if (!valid) {
        yield handleResponse(res, {
            data: null,
            eid: req.cookies.eid,
            err: errMsg,
            isErr: true,
            status: 400,
            service: service
        });
        return;
    }
    ;
    next();
});