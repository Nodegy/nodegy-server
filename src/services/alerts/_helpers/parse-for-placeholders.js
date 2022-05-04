module.exports = (alert, position) => {
    const replacements = {
        '{{ alert name }}': alert.name.charAt(0).toUpperCase() + alert.name.slice(1),
    };

    let message = alert.messages.filter(msg => msg.position == position);
    message = message[0].message.text;
    let res;
    Object.keys(replacements).forEach(key => {
        res = message.includes(key) ? message.replace(key, replacements[key]) : message;
    });

    return res;
};