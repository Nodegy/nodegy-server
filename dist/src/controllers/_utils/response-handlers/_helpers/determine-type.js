"use strict";
module.exports = (service) => {
    let type;
    service = service.toLowerCase();
    const incoming = ['incoming', 'receive'];
    const outgoing = ['outgoing', 'send'];
    switch (true) {
        case incoming.some(el => service.includes(el)):
            type = 'incoming';
            break;
        case outgoing.some(el => service.includes(el)):
            type = 'outgoing';
            break;
        default:
            type = 'action';
            break;
    }
    ;
    return type;
};
