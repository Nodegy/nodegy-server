module.exports = (stratData, activeStratData) => {
    let activeConditions = {};
    activeStratData.conditions.forEach(cond => {
        activeConditions[cond.name] = cond.val;
    });
    const activeConditionKeys = Object.keys(activeConditions);
    let posStates = {};
    stratData.forEach(pos => {
        if (pos.position != activeStratData.lastTrigger) {
            if (pos.requiredConditions == 'one') {
                posStates[pos.position] = pos.conditions.some(cond =>
                    activeConditionKeys.includes(cond.name) && activeConditions[cond.name] == cond.val
                );

            } else if (pos.requiredConditions == 'all') {
                posStates[pos.position] = pos.conditions.every(cond =>
                    activeConditionKeys.includes(cond.name) && activeConditions[cond.name] == cond.val
                );
            };
        }

    });
    return sortPosStates(posStates);
};

const sortPosStates = (posStates) => {
    let alertsToSend = [];
    Object.keys(posStates).forEach(key => {
        if (posStates[key]) {
            if (key.toLowerCase().includes('close')) {
                alertsToSend.unshift(key);
            } else {
                alertsToSend.push(key);
            };
        };
    });
    return alertsToSend;
};