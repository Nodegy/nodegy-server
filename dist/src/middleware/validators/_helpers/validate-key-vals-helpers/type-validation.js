"use strict";
module.exports = (key, val, type) => {
    type = type.toLowerCase();
    return (type === 'array' ? Array.isArray(val) : typeof val === type)
        ? { isValid: true }
        : {
            isValid: false,
            msg: `Key: ${key}. Failed type check. Type: ${typeof val}, require string.`
        };
};
