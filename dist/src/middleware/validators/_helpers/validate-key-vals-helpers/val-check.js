"use strict";
module.exports = (key, val) => {
    if (!(typeof val === 'number'
        || typeof val === 'boolean')) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed type check. Type: ${typeof val}, require number or boolean.`
        };
    }
    ;
    return { isValid: true };
};
