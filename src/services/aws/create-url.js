
module.exports = (apiId, apiLocation, apiStage, connectionId) => {
    return `https://${apiId}.execute-api.${apiLocation}.amazonaws.com/${apiStage}/@connections/${connectionId}`
}