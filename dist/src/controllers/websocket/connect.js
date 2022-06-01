"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');
module.exports = (req, res) => {
    const eid = req.cookies.eid;
    const connectionId = req.body.connectionId;
    const domain = req.body.domain;
    const stage = req.body.stage;
    console.log('connectionId: ', connectionId);
    console.log('domain: ', domain);
    console.log('stage: ', stage);
    addClient(connectionId, eid);
    return res.status(200).send('connected');
};
