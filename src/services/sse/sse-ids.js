const SseIds = class {
    constructor() {
        this.clients = [];
    };

    addClient = (client) => {
        this.clients.push(client);
    };

    getAllClients = () => {
        return this.clients;
    };

    getClient = (clientId) => {
        return this.clients.filter(client => client.id === clientId);
    };

    getLoginStatus = (clientId) => {
        return this.clients.filter(client => client.id === clientId).length > 0;
    };

    removeClient = (clientId) => {
        this.clients = this.clients.filter(client => client.id !== clientId);
    };
};

module.exports = new SseIds();