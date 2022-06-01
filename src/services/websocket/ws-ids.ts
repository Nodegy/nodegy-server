interface IClient {
    clientIds: string[],
    userId: string,
}

const WsIds = class {
    clients: IClient[];
    constructor() {
        this.clients = [{ userId: '', clientIds: [''] }];
    };

    addClient = (clientId: string, userId: string): void => {
        const clientIdx = this.clients.findIndex(i => i.userId === userId);
        if (clientIdx != -1) {
            this.clients[clientIdx].clientIds.push(clientId);
        } else {
            this.clients.push({ userId: userId, clientIds: [clientId] });
        };
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
            this.clients[idx].clientIds.length > 1 ?
                this.clients[idx].clientIds = this.clients[idx].clientIds.filter(item => item != clientId) :
                this.clients.splice(idx, 1);
        }
    };
};

module.exports = new WsIds();