"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { removeClient } = require('../../services/websocket/ws-ids');
const service = 'websocket disconnect';
module.exports = (req, res) => {
    const eid = req.cookies.eid;
    const connectionId = req.body.connectionId;
    removeClient(connectionId, eid);
    return res.status(200).send('disconnected');
};
