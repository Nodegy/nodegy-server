const db = require('../../../models');
const Alert = db.alert;
const Strategy = db.strategy;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'delete alert';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const alertId = req.params.id;
    let updatedStrategies;
    let err;
    try {
        const confirm = await Alert.findByIdAndRemove(alertId);
        if (confirm) {
            updatedStrategies = await Strategy.updateMany({ $pull: { 'alerts': alertId } });
        };
    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: err ? null : updatedStrategies,
            eid: eid,
            err: err,
            isErr: err || !updatedStrategies ? true : false,
            status: err ? 500 : updatedStrategies ? 200 : 400,
            service: service
        });
    };
};