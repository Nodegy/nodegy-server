const db = require('../../../../models');

module.exports = (key, val) => {
    if (!Array.isArray(val)) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed type check. Type: ${typeof val}, require array.`
        };
    };
    if (!val.every(elem => db.ROLES.includes(elem))) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed Role check.`
        };
    };

    return { isValid: true };
};