const service = 'websocket send';
const { sendEventToUser } = require('../../services/websocket/index');

module.exports = async (req, res) => {
    const eid = req.body.eid;
    // const clientId = req.body.connectionId;
    const connectionIds = req.body.connectionIds;

    sendEventToUser(eid, { testPayload: 'successful' }, connectionIds);

    return res.status(200).send('message sent');
};