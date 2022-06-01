"use strict";
const { getLoginStatus } = require('./sse-ids');
module.exports = ({ clientId }) => {
    return getLoginStatus(clientId);
};
