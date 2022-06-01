"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');
module.exports = (req, res) => {
    console.log('connecting:');
    let jsonData;
    try {
        jsonData = JSON.parse(JSON.stringify(req));
        console.log('req parsed: ', jsonData);
    }
    catch (err) {
        console.log('err 1 in connect: ', err);
    }
    try {
        const connectionId = jsonData.body.connectionId;
        console.log('connectionId: ', connectionId);
    }
    catch (err) {
        console.log('err 2 in connect: ', err);
    }
    // const eid: string = req.cookies.eid;
    // console.log('eid: ', eid);
    // const domain: string = Object.keys(req.body).includes('domain') ? req.body.domain : null;
    // const stage: string = Object.keys(req.body).includes('stage') ? req.body.stage : null;
    // console.log('domain: ', domain);
    // console.log('stage: ', stage);
    // addClient(connectionId, eid);
    return res.status(200).send('connected');
};
