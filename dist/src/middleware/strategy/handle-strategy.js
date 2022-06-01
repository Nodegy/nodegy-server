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
const Strategy = db.strategy;
const Webhook = db.webhook;
const { determineActivePosition, determinePosStates, generateNotificationsPayload, handleTriggeredAlerts, updateActiveConditions } = require('./_helpers/index');
const service = 'handle strategy';
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.params.eid ? req.params.eid : req.cookies.eid;
    const body = req.body;
    const bodyKeys = Object.keys(body);
    const reqIsFromFe = bodyKeys.includes('from');
    let err;
    let status = 200;
    let incomingTriggers;
    let notifications;
    let strategy;
    let triggeredPositions;
    let webhook;
    try {
        if (bodyKeys.includes('conditions')) {
            const stratId = body._id;
            strategy = yield Strategy.findById(stratId);
            if (!strategy) {
                err = 'invalid strategy id';
                status = 400;
            }
            ;
            if (!err && !strategy.active) {
                err = 'inactive Strategy';
                status = 400;
            }
            ;
            incomingTriggers = body.conditions;
            webhook = new Webhook({
                eid: eid,
                conditions: incomingTriggers,
                stratId: body._id,
                symbol: body.symbol,
            });
            webhook = yield webhook.save(webhook);
            if (!err) {
                const activeConditions = updateActiveConditions(incomingTriggers, strategy.activeStratData.conditions);
                triggeredPositions = determinePosStates(strategy.stratData, strategy.activeStratData);
                const activePosition = determineActivePosition(strategy.activeStratData.position, triggeredPositions);
                const activeStratData = {
                    conditions: activeConditions,
                    lastTrigger: triggeredPositions.length ? triggeredPositions[triggeredPositions.length - 1] : strategy.activeStratData.lastTrigger,
                    positionState: activePosition,
                };
                strategy = yield Strategy.findByIdAndUpdate({ _id: stratId }, { $set: { activeStratData: activeStratData } }, { new: true });
            }
            ;
        }
        ;
    }
    catch (error) {
        err = error;
        status = 500;
    }
    ;
    try {
        notifications = generateNotificationsPayload(eid, err, service, strategy.name, incomingTriggers, triggeredPositions);
        if (!err) {
            yield handleTriggeredAlerts(strategy.alerts, strategy.name, strategy.symbol, triggeredPositions);
        }
        ;
    }
    catch (error) {
        err = error;
        status = 500;
    }
    finally {
        req.body = {
            err: err,
            fromFe: reqIsFromFe,
            notifications: notifications,
            status: status,
            strategy: strategy,
            webhook: webhook,
        };
        next();
    }
    ;
});
