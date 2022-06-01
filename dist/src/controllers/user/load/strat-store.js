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
const { handleResponse } = require('../../_utils/response-handlers/index');
const { notificationsStoreLoader, stratStoreLoader } = require('../../loaders/index');
const service = 'load strat store';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    let payload;
    let err;
    try {
        if (!req.cookies.eid) {
            res.status(400).send({
                message: 'Invalid cookie. Require eid'
            });
            return;
        }
        ;
        payload = {
            stratStore: yield stratStoreLoader(eid),
            notifications: yield notificationsStoreLoader(eid)
        };
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: err ? null : payload,
            eid: eid,
            err: err,
            isErr: err || !payload ? true : false,
            status: err ? 500 : payload ? 200 : 400,
            service: service
        });
    }
    ;
});
