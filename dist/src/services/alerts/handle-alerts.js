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
const services = require('./index');
const { handleInternalError } = require('../../utils/internal-handlers');
const { createAlertMessage, getFormattedTime } = require('./_helpers');
module.exports = (symbol, strategyName, alertPositions, alerts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // time is set to defaults, TODO: Add user specific time settings
        const currentTime = getFormattedTime('GMT-0500', 24);
        symbol = symbol.toUpperCase();
        strategyName = strategyName.charAt(0).toUpperCase() + strategyName.slice(1),
            alertPositions.forEach((posAction) => __awaiter(void 0, void 0, void 0, function* () {
                alerts.forEach((alert) => __awaiter(void 0, void 0, void 0, function* () {
                    const alertType = alert.type;
                    const address = alert.address;
                    const message = createAlertMessage(alert, posAction);
                    switch (alertType) {
                        case 'discord':
                            yield services.discord(symbol, strategyName, posAction, message, address, currentTime);
                            break;
                        case 'email':
                            yield services.email(symbol, strategyName, posAction, message, address, currentTime);
                            break;
                        case 'bot':
                            console.log('send bot notification');
                            break;
                    }
                    ;
                }));
            }));
    }
    catch (err) {
        handleInternalError({
            message: 'Error',
            err: err,
            service: 'Handle Alerts'
        });
    }
    ;
});
