const db = require('../../models');
const Strategy = db.strategy;
const Webhook = db.webhook;
const { determineActivePosition,
    determinePosStates,
    generateNotificationsPayload,
    handleTriggeredAlerts,
    updateActiveConditions } = require('./_helpers/index');
const service = 'handle strategy';

module.exports = async (req, res, next) => {
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
            strategy = await Strategy.findById(stratId);
            if (!strategy) {
                err = 'invalid strategy id';
                status = 400;
            };

            if (!err && !strategy.active) {
                err = 'inactive Strategy';
                status = 400;
            };
            incomingTriggers = body.conditions;

            webhook = new Webhook({
                eid: eid,
                conditions: incomingTriggers,
                stratId: body._id,
                symbol: body.symbol,
            });
            webhook = await webhook.save(webhook);

            if (!err) {

                const activeConditions = updateActiveConditions(incomingTriggers, strategy.activeStratData.conditions);
                triggeredPositions = determinePosStates(strategy.stratData, strategy.activeStratData);
                const activePosition = determineActivePosition(strategy.activeStratData.position, triggeredPositions);

                const activeStratData = {
                    conditions: activeConditions,
                    lastTrigger: triggeredPositions.length ? triggeredPositions[triggeredPositions.length - 1] : strategy.activeStratData.lastTrigger,
                    positionState: activePosition,
                };

                strategy = await Strategy.findByIdAndUpdate(
                    { _id: stratId },
                    { $set: { activeStratData: activeStratData } },
                    { new: true });

            };
        };
    } catch (error) {
        err = error;
        status = 500;
    };

    try {
        notifications = generateNotificationsPayload(eid, err, service, strategy.name, incomingTriggers, triggeredPositions);
        if (!err) {
            await handleTriggeredAlerts(strategy.alerts, strategy.name, strategy.symbol, triggeredPositions);
        };

    } catch (error) {
        err = error;
        status = 500;
    } finally {
        req.body = {
            err: err,
            fromFe: reqIsFromFe,
            notifications: notifications,
            status: status,
            strategy: strategy,
            webhook: webhook,
        };
        next();
    };
};


