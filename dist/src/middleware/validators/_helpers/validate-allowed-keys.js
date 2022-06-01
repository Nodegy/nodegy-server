"use strict";
module.exports = (body, allowedKeys) => {
    if (!Object.keys(body).every(key => allowedKeys.includes(key))) {
        return {
            isValid: false,
            msg: `Invalid content. Allowed: ${allowedKeys.join(', ')}.`
        };
    }
    ;
    return { isValid: true };
};
