const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');
import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
    const eid: string = req.cookies.eid;
    const connectionId: string = req.body.connectionId;
    const domain: string = req.body.domain;
    const stage: string = req.body.stage;
    console.log('connectionId: ', connectionId);
    console.log('domain: ', domain);
    console.log('stage: ', stage);

    addClient(connectionId, eid);

    return res.status(200).send('connected');
};