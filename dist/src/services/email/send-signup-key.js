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
const emailService = require('./send-email-service');
module.exports = (address, signupKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = 'Nodegy Signup Key';
        const msgBody = `Beta Signup Key: ${signupKey}`;
        const confirm = yield emailService(address, subject, msgBody);
        return Promise.resolve(confirm);
    }
    catch (err) {
        return Promise.reject(err);
    }
    ;
});
