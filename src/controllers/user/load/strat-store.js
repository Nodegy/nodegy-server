const { handleResponse } = require('../../_utils/response-handlers/index');
const { notificationsStoreLoader, stratStoreLoader } = require('../../loaders/index');
const service = 'load strat store';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let payload;
    let err;
    try {
        if (!req.cookies.eid) {
            res.status(400).send({
                message: 'Invalid cookie. Require eid'
            });
            return;
        };
        payload = {
            stratStore: await stratStoreLoader(eid),
            notifications: await notificationsStoreLoader(eid)
        };

    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: err ? null : payload,
            eid: eid,
            err: err,
            isErr: err || !payload ? true : false,
            status: err ? 500 : payload ? 200 : 400,
            service: service
        });
    };
};