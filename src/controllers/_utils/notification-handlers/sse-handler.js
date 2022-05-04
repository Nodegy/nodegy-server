const { getLoginStatus, sendEventToUser } = require('../../../services/sse/index');

module.exports = async (eid, payload, type) => {
    try {
        if (shouldSendSse(eid, type)) {
            await sendEventToUser({
                clientId: eid,
                payload
            });
        };
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    };
};

const shouldSendSse = (eid, type) => {
    const isLoggedIn = getLoginStatus({ clientId: eid });
    const typeCheck = type === 'incoming' || type === 'outgoing';
    return isLoggedIn && typeCheck;
};