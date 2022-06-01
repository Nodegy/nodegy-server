"use strict";
module.exports = (body, requiredKeys, allowedKeys) => {
    const len = Object.keys(body).length;
    const minLen = allowedKeys !== undefined ? requiredKeys.length + 1 : requiredKeys.length;
    const maxLen = allowedKeys !== undefined ? allowedKeys.length : requiredKeys.length;
    if (len < minLen || len > maxLen) {
        return {
            isValid: false,
            msg: `Validation failed length check.  Length ${len}.  Require min: ${minLen}, max ${maxLen}`
        };
    }
    else if (allowedKeys && !requiredKeys.every(key => Object.keys(body).includes(key))
        || ((!allowedKeys || allowedKeys === undefined)
            && (!Object.keys(body).every(key => requiredKeys.includes(key))))) {
        return {
            isValid: false,
            msg: `Invalid content. Require ${requiredKeys.join(', ')}.`
        };
    }
    else {
        return { isValid: true };
    }
};
