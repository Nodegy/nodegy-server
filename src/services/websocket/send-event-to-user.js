const axios = require('axios');
const { getClient } = require('../../services/websocket/ws-ids');
const { createUrl } = require('../aws');

const apiId = process.env.API_ID;
const apiStage = process.env.API_STAGE;
const apiLocation = process.env.API_LOCATION;

module.exports = (eid, payload) => {
    try {
        console.log('sending');
        const client = getClient(eid);
        // console.log('client: ', client)
        const connectionIds = client.connectionIds;
        console.log('connectionIds: ', connectionIds)

        let callbackUrl;
        connectionIds.forEach(connectionId => {
            callbackUrl = createUrl(apiId, apiLocation, apiStage, connectionId)
            console.log('callbackUrl: ', callbackUrl)
            axios.post(callbackUrl, payload)
                .then(({ data }) => {
                    console.log('DATA: ', data)
                })
                .catch((err) => {
                    let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
                    console.warn("error", message);
                });
        });

    } catch (err) {
        console.log('err in send event to user: ', err);
    }
    console.log('send events to user complete');
};