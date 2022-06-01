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
const { getLoginStatus, sendEventToUser } = require('../../../services/sse/index');
module.exports = (eid, payload, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (shouldSendSse(eid, type)) {
            yield sendEventToUser({
                clientId: eid,
                payload
            });
        }
        ;
        return Promise.resolve();
    }
    catch (err) {
        return Promise.reject(err);
    }
    ;
});
const shouldSendSse = (eid, type) => {
    const isLoggedIn = getLoginStatus({ clientId: eid });
    const typeCheck = type === 'incoming' || type === 'outgoing';
    return isLoggedIn && typeCheck;
};
