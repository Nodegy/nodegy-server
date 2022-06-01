"use strict";
const keys = ['position', 'message'];
const msgKeys = ['default', 'text'];
module.exports = (key, val) => {
    if (!typeof val === 'object') {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed type check. Type: ${typeof val}, require object.`
        };
    }
    ;
    if (val.length < 4) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed length check. Length: ${val.length}, require 4.`
        };
    }
    ;
    if (!val.every(item => typeof item === 'object'
        && Object.keys(item).every(key => keys.includes(key)
            && Object.keys(item.message).every(msgKey => msgKeys.includes(msgKey))))) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed object items check. Require: ${keys.join(', ')} | ${msgKeys.join(', ')}`
        };
    }
    ;
    return { isValid: true };
};
