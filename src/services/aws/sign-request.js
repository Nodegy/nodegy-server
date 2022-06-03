const aws4 = require('aws4');

module.exports = (hostname, payload, service, apiRegion) => {
    const requestOptions = {
        host: hostname,
        method: 'POST',
        service: service,
        region: apiRegion,
        body: JSON.stringify(payload),
        // path: `/beta/@connections/test`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-amz-target': 'com.amazonaws.agcod.AGCODService.CreateGiftCard',
        }

    }, requestCreds = {
        secretAccessKey: process.env.AWS_ACCESS_KEY,
        accessKeyId: process.env.AWS_SECRET_KEY
    };

    // console.log(aws4.sign(requestOptions, requestCreds))

    return aws4.sign(requestOptions, requestCreds);
};