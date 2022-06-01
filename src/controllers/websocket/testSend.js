const service = 'websocket send';
const { sendEventToUser } = require('../../services/websocket/index');

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    const clientId = req.body.connectionId;

    sendEventToUser(clientId, eid);

    return res.status(200).send('message sent');
};