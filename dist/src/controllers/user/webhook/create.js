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
const { handleExternalRequestResponse } = require('../../_utils/response-handlers/index');
const { handleSse, handleNotifications } = require('../../_utils/notification-handlers/index');
const service = 'incoming webhook';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.params.eid;
    const body = req.body;
    let status = body.status;
    const ssePayload = {
        details: {
            service: service,
        },
        payload: {
            notifications: body.notifications,
            webhook: body.webhook,
            strategy: body.strategy,
            fromFe: body.fromFe
        },
    };
    try {
        yield handleNotifications(eid, body.notifications);
        yield handleSse(eid, ssePayload, 'incoming');
    }
    catch (err) {
        status = 500;
    }
    finally {
        yield handleExternalRequestResponse(res, {
            service: service,
            status: status,
        });
    }
    ;
});
