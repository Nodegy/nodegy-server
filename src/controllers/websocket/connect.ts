import { handleResponse } from '../_utils/response-handlers/index';
const service = 'websocket connect';
const { addClient } = require('../../services/websocket/ws-ids');
import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
    const eid = req.cookies.eid;



    // await handleResponse(res, {
    //     data: 'null',
    //     eid: eid,
    //     err: 'null',
    //     isErr: false,
    //     status: 200,
    //     service: service
    // });

    return res.status(200).send('connected')

};