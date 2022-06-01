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
const User = db.user;
const bcrypt = require('bcrypt');
const { handleResponse } = require('../../_utils/response-handlers/index');
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let service = 'update user';
    const _id = req.cookies.id;
    const eid = req.cookies.eid;
    let confirm;
    let err;
    const bodyKeys = Object.keys(req.body);
    service += ' ' + bodyKeys.join(', ');
    const payload = bodyKeys.includes('password') ?
        { password: bcrypt.hashSync(req.body.password, 1) }
        : req.body;
    try {
        confirm = yield User.findByIdAndUpdate(_id, payload);
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
