const services = require('./index');
const { handleInternalError } = require('../../utils/internal-handlers/index');
const { parseForPlaceholders } = require('./_helpers/index');

module.exports = async (symbol, strategyName, alertPositions, alerts) => {
    try {
        alertPositions.forEach(async posAction => {
            alerts.forEach(async alert => {
                const alertType = alert.type;
                const address = alert.address;
                let message = parseForPlaceholders(alert, posAction);

                switch (alertType) {
                    case 'discord':
                        await services.discord(symbol, strategyName, posAction, message, address);
                        break;

                    case 'email':
                        await services.email(symbol, strategyName, posAction, message, address);
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