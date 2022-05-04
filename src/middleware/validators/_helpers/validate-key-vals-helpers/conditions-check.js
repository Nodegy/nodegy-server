const checkDupVals = require('../check-dup-vals');

module.exports = (key, val) => {
    let keys = ['name', 'val'];

    if (Object.keys(val[0]).includes('valType')) {
        keys.push('valType');
    };

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

    if (!checkDupVals(val, 'name')) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed dup name check.`
        };
    };
    if (!val.every(item =>
        typeof item === 'object'
        && Object.keys(item).length === keys.length
        && Object.keys(item).every(itemKey =>
            keys.includes(itemKey))
        && (!keys.includes('valType') || item.valType === typeof item.val)
    )) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed object keys check.`
        };
    };

    return { isValid: true };
};