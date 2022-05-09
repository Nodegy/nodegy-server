const db = require('../../../models');
const Alert = db.alert;
const handleAlerts = require('../../../services/alerts/handle-alerts');

module.exports = async (alertIds, stratName, symbol, triggeredPositions) => {
    try {
        if (triggeredPositions.length > 0) {
            const alerts = await Alert.find({ '_id': { $in: alertIds } });
            await handleAlerts(
                symbol,
                stratName,
                triggeredPositions,
                alerts);
        };
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    };

};