const { handleExternalRequestResponse } = require('../../_utils/response-handlers/index');
const { handleSse, handleNotifications } = require('../../_utils/notification-handlers/index');
const service = 'incoming webhook';

module.exports = async (req, res) => {
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
        await handleNotifications(eid, body.notifications);
        await handleSse(eid, ssePayload, 'incoming');
    } catch (err) {
        status = 500;
    } finally {
        await handleExternalRequestResponse(res, {
            service: service,
            status: status,
        });
    };
};
