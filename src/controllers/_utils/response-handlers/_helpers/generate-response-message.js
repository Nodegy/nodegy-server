module.exports = (service, isErr, err) => {
    const errMsg = `error: [${err ? `${err.messagge || err}` : ''}]`;
    const successMsg = 'success!';
    return `${service} - ${isErr ? errMsg : successMsg}`;
};