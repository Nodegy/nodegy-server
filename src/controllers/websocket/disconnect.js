const { removeClient } = require('../../services/websocket/ws-ids');
const service = 'websocket disconnect';

module.exports = (req, res) => {
    console.log('disconnecting: ');
    console.log('req.body: ', req.body);
    const connectionId = req.body.connectionId;
    removeClient(connectionId);

    return res.status(200).send({ status: 'disconnected' });
};