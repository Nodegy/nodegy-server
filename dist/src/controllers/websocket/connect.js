"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');
module.exports = (req, res) => {
    console.log('connecting:');
    const eid = req.cookies.eid;
    console.log('eid: ', eid);
    const connectionId = req.body.connectionId;
    const domain = Object.keys(req.body).includes('domain') ? req.body.domain : null;
    const stage = Object.keys(req.body).includes('stage') ? req.body.stage : null;
    console.log('connectionId: ', connectionId);
    console.log('domain: ', domain);
    console.log('stage: ', stage);
    addClient(connectionId, eid);
    return res.status(200).send('connected');
};
