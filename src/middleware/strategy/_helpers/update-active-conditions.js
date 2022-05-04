module.exports = (incomingTriggers, activeConditions) => {
    let updatedConditions = [...activeConditions];
    let triggers = {};
    incomingTriggers.forEach(trigger => {
        triggers[trigger.name] = trigger.val;
    });
    const triggerKeys = Object.keys(triggers);
    updatedConditions.forEach(cond => {
        if (triggerKeys.includes(cond.name)) {
            cond.val = triggers[cond.name];
        };
    });
    return updatedConditions;
};