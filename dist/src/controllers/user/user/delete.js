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
const Archive = db.archive;
const Alert = db.alert;
const Webhook = db.webhook;
const Strategy = db.strategy;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'delete user';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    let confirmDeletedUser;
    let err;
    try {
        let archive = new Archive({
            eid: eid,
            user: null,
            alerts: null,
            strategies: null,
            activeStrategies: null,
            webhooks: null
        });
        archive.user = yield User.findOne({ eid: eid });
        archive.alerts = yield Alert.find({ eid: eid });
        archive.strategies = yield Strategy.find({ eid: eid });
        archive.webhooks = yield Webhook.find({ eid: eid });
        const confirm = yield archive.save(archive);
        if (confirm) {
            yield User.findOneAndRemove({ _id: req.cookies.id });
            yield Alert.deleteMany({ eid: eid });
            yield Strategy.deleteMany({ eid: eid });
            yield Webhook.deleteMany({ eid: eid });
            confirmDeletedUser = true;
        }
        ;
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: null,
            eid: eid,
            err: err,
            isErr: err || !confirmDeletedUser ? true : false,
            status: err ? 500 : confirmDeletedUser ? 200 : 400,
            service: service
        });
    }
    ;
});
