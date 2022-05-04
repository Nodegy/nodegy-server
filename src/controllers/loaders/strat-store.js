const db = require('../../models');
const Alert = db.alert;
const Strategy = db.strategy;
const Webhook = db.webhook;

module.exports = async (eid) => {
    try {
        let payload = {
            alerts: await Alert.find({ eid: eid }),
            strategies: await Strategy.find({ eid: eid }).populate({
                path: 'alerts',
                model: 'Alert'
            }),
            webhooks: await Webhook.find({ eid: eid })
        };
        return Promise.resolve(payload);
    } catch (err) {
        return Promise.reject(err);
    };
};