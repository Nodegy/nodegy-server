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
const { handleResponse } = require('../../../controllers/_utils/response-handlers/index');
const { vRequiredKeys } = require('../_helpers/index');
const service = 'create site error';
const requiredKeys = ['service', 'function', 'message', 'payload', 'stack'];
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let valid = true;
    let errMsg = '';
    let validate;
    if (!req.cookies.id) {
        errMsg = 'Invalid cookies. Require id.';
        valid = false;
    }
    ;
    if (valid) {
        validate = vRequiredKeys(req.body, requiredKeys);
        if (!validate.isValid) {
            errMsg = validate.msg;
            valid = false;
        }
        ;
    }
    ;
    if (valid) {
        validate = Object.keys(req.body).every(key => typeof key === 'string');
        if (!validate) {
            errMsg = 'Value types failed.';
            valid = false;
        }
        ;
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
