"use strict";
const keys = ['positionState', 'conditions', 'lastTrigger'];
module.exports = (key, val) => {
    if (!typeof val === 'object') {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed type check. Type: ${typeof val}, require object.`
        };
    }
    ;
    if (!Object.keys(val).length == keys.length || !Object.keys(val).every(key => keys.includes(key))) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed object items check. Require: ${keys.join(', ')}}`
        };
    }
    ;
    return { isValid: true };
};
