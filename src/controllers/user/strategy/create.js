const db = require('../../../models');
const Strategy = db.strategy;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'create strategy';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const strategy = new Strategy({
        activeStratData: req.body.activeStratData,
        alerts: req.body.alerts,
        conditionsReady: req.body.conditionsReady,
        eid: eid,
        name: req.body.name,
        notes: req.body.notes,
        stratData: req.body.stratData,
        symbol: req.body.symbol,
    });
    let confirm;
    let err;
    try {
        confirm = await strategy.save(strategy);
    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: err ? null : confirm,
            eid: eid,
            err: err,
            isErr: err || !confirm ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
    };
};