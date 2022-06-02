const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');

module.exports = (req, res) => {
    const eid = req.body.eid;
    const connectionId = req.body.connectionId;

    addClient(connectionId, eid);

    return res.status(200).send({ status: 'connected' });
};