// const { removeClient } = require('../../services/websocket/ws-ids');
const service = 'websocket disconnect';

module.exports = (req, res) => {
    // const eid = req.cookies.eid;
    // const connectionId = req.body.connectionId;

    // removeClient(connectionId, eid);
    console.log('disconnected')

    return res.status(200).send({ status: 'disconnected' });
};