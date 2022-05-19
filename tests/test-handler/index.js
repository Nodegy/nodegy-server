const logger = require('../../src/utils/logger');

class TestHandler {
    constructor() {
        this.testsPassed = 0;
        this.totalTests = 0;
    };

    getTotalTests() {
        return this.totalTests;
    };

    getTotalTestsPassed() {
        return this.testsPassed;
    };

    async runTest(service, functionName, test) {
        this.totalTests += 1;
        logger.info(`Testing: ${service} [${functionName}]`);
        const testPassed = await test();
        if (testPassed) {
            const msg = `Test ${service} ${functionName}: ${testPassed ? 'Passed' : 'Failed'}`
            if (!testPassed) {
                logger.error(msg, 'error');
                return;
            };
            this.testsPassed += 1;
            logger.info(msg);
        };
    };
};

module.exports = new TestHandler();