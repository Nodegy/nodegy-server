const { handleInternalError } = require('../../utils/internal-handlers/index');
const { getClient } = require('./sse-ids');

module.exports = async ({ clientId, payload }) => {
    try {
        const registeredClients = getClient(clientId);
        if (registeredClients.length > 0) {
            registeredClients.forEach(client => client.res.write(`data: ${JSON.stringify(payload)}\n\n`));
            return true;
        };
        return false;

    } catch (err) {
        handleInternalError({
            message: 'Error',
            err: err,
            service: 'sendEventToUser'
        });
    };

};