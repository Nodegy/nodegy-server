const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');

module.exports = (req, res) => {
    console.log('connecting:');
    console.log('req: ', req);
    console.log('typeof: ', typeof req);

    const connectionId = req.body.connectionId;
    console.log('connectionId: ', connectionId);

    const domain = Object.keys(req.body).includes('domain') ? req.body.domain : null;
    const stage = Object.keys(req.body).includes('stage') ? req.body.stage : null;

    console.log('domain: ', domain);
    console.log('stage: ', stage);

    // addClient(connectionId, eid);

    return res.status(200).send('connected');
};