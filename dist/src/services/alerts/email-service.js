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
const { handleInternalError } = require('../../utils/internal-handlers/index');
const emailService = require('../email/send-email-service');
module.exports = (symbol, name, posAction, message, address, currentTime) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = `Nodegy Alert! Strategy: ${name}, Symbol: ${symbol}`;
        const msgBody = `Strategy: ${name}\nAction: ${posAction}\nSymbol: ${symbol}\nDate/Time: ${currentTime}\nMessage: ${message}`;
        const confirm = yield emailService(address, subject, msgBody);
        if (confirm) {
            return Promise.resolve(confirm);
        }
        ;
    }
    catch (err) {
        handleInternalError({
            message: 'Error in Email Service',
            err: err,
            service: 'Email Service'
        });
    }
    ;
});
