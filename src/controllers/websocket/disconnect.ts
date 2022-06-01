const { handleResponse } = require('../_utils/response-handlers/index');
const { removeClient } = require('../../services/websocket/ws-ids');
const service = 'websocket disconnect';
import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
    const eid = req.cookies.eid;

    console.log('\n\n\nDISCONNECTED TEST SUCCESSFUL\n\n\n')
    return res.status(200).send({ message: 'disconnection success' })
};