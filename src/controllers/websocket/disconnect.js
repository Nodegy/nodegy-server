const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'websocket disconnect';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;

    console.log('\n\n\nDISCONNECTED TEST SUCCESSFUL\n\n\n')
    return res.status(200).send({ message: 'disconnection success' })
};