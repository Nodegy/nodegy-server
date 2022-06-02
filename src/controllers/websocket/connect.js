const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');

module.exports = (req, res) => {
    console.log('-------- connecting: ----------');
    console.log('BODY TEST: ', req.body)
    // const connectionId = req.body.connectionId;

    // addClient(connectionId, eid);

    return res.status(200).send({ status: 'connected' });
};