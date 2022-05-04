const db = require('../../../models');
const User = db.user;
const Archive = db.archive;
const Alert = db.alert;
const Webhook = db.webhook;
const Strategy = db.strategy;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'delete user';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let confirmDeletedUser;
    let err;

    try {
        let archive = new Archive({
            eid: eid,
            user: null,
            alerts: null,
            strategies: null,
            activeStrategies: null,
            webhooks: null
        });

        archive.user = await User.findOne({ eid: eid });
        archive.alerts = await Alert.find({ eid: eid });
        archive.strategies = await Strategy.find({ eid: eid });
        archive.webhooks = await Webhook.find({ eid: eid });

        const confirm = await archive.save(archive);

        if (confirm) {
            await User.findOneAndRemove({ _id: req.cookies.id });
            await Alert.deleteMany({ eid: eid });
            await Strategy.deleteMany({ eid: eid });
            await Webhook.deleteMany({ eid: eid });
            confirmDeletedUser = true
        };

    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: null,
            eid: eid,
            err: err,
            isErr: err || !confirmDeletedUser ? true : false,
            status: err ? 500 : confirmDeletedUser ? 200 : 400,
            service: service
        });
    };

};