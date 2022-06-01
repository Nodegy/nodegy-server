"use strict";
const { generateMessage } = require('./_helpers/index');
module.exports = (eid, err, service, stratName, triggers, triggeredPositions) => {
    let notifications = [];
    const triggerNames = triggers.map(trigger => trigger.name);
    let msg = `Webhook received!  Strategy: [${stratName}], Conditions: [${triggerNames.join(', ')}].`;
    if (err) {
        msg += ` Error: ${err}`;
    }
    ;
    notifications.push({
        eid: eid,
        message: msg,
        service: 'incoming webhook',
        success: err ? false : true,
        type: 'incoming'
    });
    if (!err) {
        triggeredPositions.forEach(pos => {
            notifications.push({
                eid: eid,
                message: generateMessage(pos, stratName),
                service: service,
                success: true,
                type: 'outgoing'
            });
        });
    }
    ;
    return notifications;
};
