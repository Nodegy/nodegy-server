const { removeClient } = require('../../services/websocket/ws-ids');
const service = 'websocket disconnect';
import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
    const eid: string = req.cookies.eid;
    const clientId: string = req.body.connectionId;

    removeClient(clientId, eid);

    return res.status(200).send('disconnected');
};