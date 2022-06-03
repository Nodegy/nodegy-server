
module.exports = (apiId, apiRegion, apiStage, connectionId) => {
    return `https://${apiId}.execute-api.${apiRegion}.amazonaws.com/${apiStage}/@connections/${connectionId}`
}