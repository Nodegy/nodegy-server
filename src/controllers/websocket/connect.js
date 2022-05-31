const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'websocket connect';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;

    console.log('\n\n\nCONNECTED TEST SUCCESSFUL\n\n\n')
    console.log('req.requestContext.connectionId: ', req.requestContext.connectionId)
    return res.status(200).send({ message: 'connection success' })
};