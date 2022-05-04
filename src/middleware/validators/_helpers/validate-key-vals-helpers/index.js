const activeStratDataCheck = require('./active-strat-data-check');
const alertMessagesCheck = require('./alert-messages-check');
const alertsCheck = require('./alerts-check');
const conditionsCheck = require('./conditions-check');
const positionCheck = require('./position-check');
const positionStateCheck = require('./position-state-check');
const rolesCheck = require('./roles-check');
const stratDataCheck = require('./strat-data-check');
const valTypeCheck = require('./val-type-check');
const typeValidation = require('./type-validation');
const valCheck = require('./val-check');

module.exports = {
    activeStratDataCheck,
    alertMessagesCheck,
    alertsCheck,
    conditionsCheck,
    positionCheck,
    positionStateCheck,
    rolesCheck,
    stratDataCheck,
    valTypeCheck,
    typeValidation,
    valCheck
};