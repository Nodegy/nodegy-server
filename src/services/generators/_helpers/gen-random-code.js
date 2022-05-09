module.exports = (maxChars) => {
    const characters = 'abcdefghijklmnpqrstuvwxyz123456789';
    let result = '';
    const charsLength = characters.length;

    for (let i = 0; i < maxChars; i++) {
        result += characters.charAt(Math.floor(Math.random() * charsLength));
    };
    return result;
};