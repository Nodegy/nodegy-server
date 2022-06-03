const aws4 = require('aws4');

module.exports = (hostname, payload, service, apiRegion) => {
    const requestOptions = {
        host: hostname,
        method: 'POST',
        service: service,
        region: apiRegion
    }, requestCreds = {
        secretAccessKey: process.env.AWS_ACCESS_KEY,
        accessKeyId: process.env.AWS_SECRET_KEY
    };

    console.log(aws4.sign(requestOptions, requestCreds))

    return aws4.sign(requestOptions, requestCreds);
};