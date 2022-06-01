const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');
import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
    const eid: string = req.cookies.eid;
    const clientId: string = req.body.connectionId;

    addClient(clientId, eid);

    return res.status(200).send('connected');
};