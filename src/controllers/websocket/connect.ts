const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');
import { Request, Response } from "express";

module.exports = (req: Request, res: Response) => {
    console.log('connecting:');
    console.log('req: ', req);
    // const eid: string = req.cookies.eid;
    // console.log('eid: ', eid);
    const connectionId: string = req.body.connectionId;
    // const domain: string = Object.keys(req.body).includes('domain') ? req.body.domain : null;
    // const stage: string = Object.keys(req.body).includes('stage') ? req.body.stage : null;
    console.log('connectionId: ', connectionId);
    // console.log('domain: ', domain);
    // console.log('stage: ', stage);

    // addClient(connectionId, eid);

    return res.status(200).send('connected');
};