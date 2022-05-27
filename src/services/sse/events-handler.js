const { addClient, removeClient } = require('./sse-ids');
const { handleInternalError } = require('../../utils/internal-handlers/index');
const logger = require('../../utils/logger');

module.exports = (req, res) => {
    try {
        const headers = {
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"
        };

        res.writeHead(200, headers);

        const clientId = req.cookies.eid;
        logger.info(`new client connected: ${clientId}`);
        addClient({
            id: clientId,
            res
        });

        req.on('close', () => {
            logger.info(`client disconnected: ${clientId}`);
            removeClient(clientId);
        });
    } catch (err) {
        handleInternalError({
            message: 'Error',
            err: err,
            service: 'Sse Events Handler'
        });
    };
};

