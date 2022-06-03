const service = 'websocket send';
const { sendEventToUser } = require('../../services/websocket/index');

module.exports = async (req, res) => {
    const eid = req.body.eid;
    // const clientId = req.body.connectionId;

    sendEventToUser(eid, { testPayload: 'successful' });

    return res.status(200).send('message sent');
};