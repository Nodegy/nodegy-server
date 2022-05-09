const { getAllClients } = require('./sse-ids');

module.exports = (data) => {
    const clients = getAllClients();
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`));
};