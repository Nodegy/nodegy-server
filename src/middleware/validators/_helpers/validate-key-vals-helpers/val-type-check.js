module.exports = (key, val) => {
    if (typeof val !== 'string') {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed type check. Type: ${typeof val}, require string.`
        };
    };
    if (!(val === 'boolean' || val === 'number')) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed val check. Val: ${val}, require number or boolean.`
        };
    };
    return { isValid: true };
};