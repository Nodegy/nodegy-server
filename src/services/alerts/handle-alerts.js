const services = require('./index');
const { handleInternalError } = require('../../utils/internal-handlers');
const { createAlertMessage, getFormattedTime } = require('./_helpers');

module.exports = async (symbol, strategyName, alertPositions, alerts) => {
    try {
        // time is set to defaults, TODO: Add user specific time settings
        const currentTime = getFormattedTime('GMT-0500', 24);
        symbol = symbol.toUpperCase();
        strategyName = strategyName.charAt(0).toUpperCase() + strategyName.slice(1),
            alertPositions.forEach(async posAction => {
                alerts.forEach(async alert => {
                    const alertType = alert.type;
                    const address = alert.address;
                    const message = createAlertMessage(alert, posAction);

                    switch (alertType) {
                        case 'discord':
                            await services.discord(symbol, strategyName, posAction, message, address, currentTime);
                            break;

                        case 'email':
                            await services.email(symbol, strategyName, posAction, message, address, currentTime);
                            break;

                        case 'bot':
                            console.log('send bot notification');
                            break;
                    };
                });
            });
    }

    catch (err) {
        handleInternalError({
            message: 'Error',
            err: err,
            service: 'Handle Alerts'
        });
    };
};