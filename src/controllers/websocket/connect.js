const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');

module.exports = (req, res) => {
    const eid = req.body.eid;
    const connectionId = req.body.connectionId;
    console.log('connecting: ');
    console.log('req.body: ', req.body);
    addClient(connectionId, eid);

    return res.status(200).send({ status: 'connected' });
};