const states = [
    'long',
    'short',
    null
];

module.exports = (key, val) => {
    if (val && typeof val !== 'string') {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed type check. Type: ${typeof val}, require string.`
        };
    };
    if (!states.includes(val)) {
        return {
            isValid: false,
            msg: `Key: ${key}. Failed position name check. Val: ${val}. Require ${states.join(', ')}.`
        };
    };
    return { isValid: true };
};