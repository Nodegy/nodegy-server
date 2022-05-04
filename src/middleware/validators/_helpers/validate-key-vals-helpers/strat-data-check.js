const checkDupVals = require('../check-dup-vals');

module.exports = (key, val) => {
    let keys = ['conditions', 'position', 'requiredConditions'];

    if (!Array.isArray(val)) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed type check. Type: ${typeof val}, require array.`
        };
    };
    if (val.length < 1) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed length check. Length: ${val.length}, require > 0.`
        };
    };
    if (!checkDupVals(val, 'position')) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed dup position check.`
        };
    };

    if (!val.every(item =>
        Object.keys(item).length === keys.length
        && Object.keys(item).every(itemKey =>
            keys.includes(itemKey)))) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed object keys check.`
        };
    };
    return { isValid: true };
};