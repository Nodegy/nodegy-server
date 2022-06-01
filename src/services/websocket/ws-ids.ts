interface IClient {
    connectionIds: string[],
    userId: string,
}

const WsIds = class {
    clients: IClient[];
    constructor() {
        this.clients = [];
    };

    addClient = (clientId: string, userId: string): void => {
        const clientIdx = this.clients.findIndex(i => i.userId === userId);
        if (clientIdx != -1) {
            if (!this.clients[clientIdx].connectionIds.includes(clientId)) {
                this.clients[clientIdx].connectionIds.push(clientId);
            }

        } else {
            this.clients.push({ userId: userId, connectionIds: [clientId] });
        };
        console.log('added client: ', this.clients);
    };

    getAllClients = (): IClient[] => {
        return this.clients;
    };

    getClient = (userId: string): IClient | null => {
        const idx = this.clients.findIndex(client => client.userId === userId);
        return idx != -1 ? this.clients[idx] : null;
    };

    getLoginStatus = (userId: string): boolean => {
        return this.clients.filter(client => client.userId === userId).length > 0;
    };

    removeClient = (clientId: string, userId: string): void => {
        const idx = this.clients.findIndex(client => client.userId === userId);
        if (idx != -1) {
            this.clients[idx].connectionIds.length > 1 ?
                this.clients[idx].connectionIds = this.clients[idx].connectionIds.filter(item => item != clientId) :
                this.clients[idx].connectionIds.includes(clientId) ? this.clients.splice(idx, 1) : null;
        }
        console.log('removed client: ', this.clients);
    };
};

module.exports = new WsIds();