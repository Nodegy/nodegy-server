module.exports = (alert, posAction) => {
    let replacements = {
        '{{ alert name }}': alert.name.charAt(0).toUpperCase() + alert.name.slice(1),
    };

    let message = alert.messages.find(msg => msg.position.toLowerCase() == posAction.toLowerCase());
    message = message.message.text;

    Object.keys(replacements).forEach(key => {
        message = message.includes(key) ? message.replace(key, replacements[key]) : message;
    });

    return message;
};