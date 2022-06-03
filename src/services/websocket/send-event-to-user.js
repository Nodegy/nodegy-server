const axios = require('axios'),
    http = require('http'),
    https = require('https'),
    { getClient } = require('../../services/websocket/ws-ids'),
    { createCallbackUrl, signRequest } = require('../aws');

const makeSignedRequest = async (connectionId, payload) => {
    try {
        const apiId = process.env.API_ID,
            apiStage = process.env.API_STAGE,
            apiRegion = process.env.API_REGION,
            callbackUrl = createCallbackUrl(apiId, apiRegion, apiStage, connectionId),
            hostname = process.env.API_HOSTNAME,
            service = process.env.API_SERVICE,
            signedPayload = signRequest(hostname, payload, service, apiRegion), config = { headers: signedPayload.headers };


        // console.log('config: ', config)
        axios.post(callbackUrl, signedPayload.body, config)
            .then(({ data }) => {
                console.log('----- POST TO FE SUCCESSFUL: ', data)
            })
            .catch((err) => {
                let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
                console.warn("----- error", message);
            });

        // const test = https.request(signedPayload, function (res) { console.log('res', res) }).end(signedPayload.body || '')

        // console.log('test: ', test)
    } catch (err) {
        console.log('err in make request: ', err);
    };
};

module.exports = (eid, payload, connectionIds) => {

    console.log('sending');
    const client = getClient(eid);
    // const connectionIds = client.connectionIds;
    console.log('connectionIds: ', connectionIds);

    connectionIds.forEach(connectionId => {
        makeSignedRequest(connectionId, payload);
    });


    console.log('send events to user complete');
};