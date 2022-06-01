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
const Alert = db.alert;
const Strategy = db.strategy;
const Webhook = db.webhook;
module.exports = (eid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload = {
            alerts: yield Alert.find({ eid: eid }),
            strategies: yield Strategy.find({ eid: eid }).populate({
                path: 'alerts',
                model: 'Alert'
            }),
            webhooks: yield Webhook.find({ eid: eid })
        };
        return Promise.resolve(payload);
    }
    catch (err) {
        return Promise.reject(err);
    }
    ;
});
