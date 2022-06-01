const service = 'websocket send';
const { sendEventToUser } = require('../../services/websocket/index');
import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
    const eid: string = req.cookies.eid;
    const clientId: string = req.body.connectionId;

    sendEventToUser(clientId, eid);

    return res.status(200).send('message sent');
};