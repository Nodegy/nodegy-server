const positions = [
    'Open Long',
    'Close Long',
    'Open Short',
    'Close Short',
    null
];

module.exports = (key, val) => {
    if (val && typeof val !== 'string') {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed type check. Type: ${typeof val}, require string.`
        };
    };
    if (!positions.includes(val)) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed position name check. Val: ${val}. Require ${positions.join(", ")}.`
        };
    };
    return { isValid: true };
};