module.exports = (currentActivePosition, triggeredPositions) => {

    let newActivePosition = currentActivePosition;
    if (triggeredPositions.length > 0) {
        const lastTrigger = triggeredPositions[triggeredPositions.length - 1].toLowerCase();
        switch (true) {
            case lastTrigger.includes('close'):
                newActivePosition = null;
                break;
            case lastTrigger.includes('open'):
                newActivePosition = lastTrigger.replace('open ', '');
            default:
                break;
        };
    };
    return newActivePosition;
};