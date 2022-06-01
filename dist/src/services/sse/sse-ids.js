"use strict";
const SseIds = class {
    constructor() {
        this.addClient = (client) => {
            this.clients.push(client);
        };
        this.getAllClients = () => {
            return this.clients;
        };
        this.getClient = (clientId) => {
            return this.clients.filter(client => client.id === clientId);
        };
        this.getLoginStatus = (clientId) => {
            return this.clients.filter(client => client.id === clientId).length > 0;
        };
        this.removeClient = (clientId) => {
            this.clients = this.clients.filter(client => client.id !== clientId);
        };
        this.clients = [];
    }
    ;
};
module.exports = new SseIds();
