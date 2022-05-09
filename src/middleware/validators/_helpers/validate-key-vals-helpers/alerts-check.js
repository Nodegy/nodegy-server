const keys = ['_id', 'messages', 'name', 'type', 'address'];
const types = ['bot', 'discord', 'email'];
module.exports = (key, val) => {
    console.log('key: ', key, 'val: ', val);
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
    if (!val.every(item => typeof item === 'object' || typeof item === 'string')) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed array items type check. Type ${typeof val[0]}. Require string.`
        };
    };
    return { isValid: true };
};