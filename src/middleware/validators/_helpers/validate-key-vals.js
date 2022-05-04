const {
    activeStratDataCheck,
    alertsCheck,
    alertMessagesCheck,
    conditionsCheck,
    positionCheck,
    positionStateCheck,
    rolesCheck,
    stratDataCheck,
    typeValidation,
    valTypeCheck,
    valCheck } = require('./validate-key-vals-helpers/index');

const hasValidPair = (key, val) => {
    switch (key) {
        case 'address':
        case 'body':
        case 'email':
        case 'from':
        case 'key':
        case 'name':
        case 'notes':
        case 'oldEmail':
        case 'password':
        case 'requiredConditions':
        case 'stratId':
        case 'subject':
        case 'symbol':
        case 'text':
        case 'theme':
        case 'timezone':
        case 'type':
        case 'userId':
        case 'username':
        case 'usernameOrEmail':
        case 'vCode':
        case '_id':
            return typeValidation(key, val, 'string');
        case 'active':
        case 'default':
        case 'generateSignupKeys':
        case 'ready':
            return typeValidation(key, val, 'boolean');
        case 'message':
        case 'preferences':
            return typeValidation(key, val, 'object');
        case 'timeFormat':
        case 'total':
            return typeValidation(key, val, 'number');
        case '_ids':
        case 'addresses':
        case 'conditionsReady':

            return typeValidation(key, val, 'array');
        case 'alerts':
            return alertsCheck(key, val);
        case 'positionState':
            return positionStateCheck(key, val);
        case 'lastTrigger':
        case 'position':
            return positionCheck(key, val);
        case 'conditions':
            return conditionsCheck(key, val);
        case 'roles':
            return rolesCheck(key, val);
        case 'messages':
            return alertMessagesCheck(key, val);
        case 'activeStratData':
            return activeStratDataCheck(key, val);
        case 'stratData':
            return stratDataCheck(key, val);
        case 'valType':
            return valTypeCheck(key, val);
        case 'val':
            return valCheck(key, val);
        case null:
        case undefined:
        default:
            return {
                isValid: false,
                msg: `Invalid key: ${key}.`
            };
    };
};

let res = { isValid: true };

const isValidArr = (arr) => {
    arr.forEach(item => {
        if (res.isValid && typeof item === 'object') {
            let checked = isValidObj(item);
            if (!checked) {
                res = checked;
            };
        };
    });
    return res;
};

const isValidObj = (obj) => {
    Object.keys(obj).forEach(key => {
        if (res.isValid && obj[key] !== null) {
            let checked = hasValidPair(key, obj[key]);
            if (!checked.isValid) {
                res = checked;
            };

            if (res.isValid
                && (Array.isArray(obj[key])
                    || typeof obj[key] === 'object')) {

                let nextCheck = Array.isArray(obj[key])
                    ? isValidArr(obj[key]) : isValidObj(obj[key]);

                if (!nextCheck.isValid) {
                    res = nextCheck;
                };
            };
        };
    });
    return res;
};

module.exports = (item) => {
    if (Array.isArray(item)) {
        return isValidArr(item);
    } else if (typeof item === 'object') {
        return isValidObj(item);
    } else {
        return false;
    };
};