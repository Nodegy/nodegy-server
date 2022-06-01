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
const handleAlerts = require('../../../services/alerts/handle-alerts');
module.exports = (alertIds, stratName, symbol, triggeredPositions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (triggeredPositions.length > 0) {
            const alerts = yield Alert.find({ '_id': { $in: alertIds } });
            yield handleAlerts(symbol, stratName, triggeredPositions, alerts);
        }
        ;
        return Promise.resolve();
    }
    catch (err) {
        return Promise.reject(err);
    }
    ;
});
