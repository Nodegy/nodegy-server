const logger = require('../src/utils/logger');
const serverConfig = require('../src/server-config');
const { totalTests } = require('./test-handler');
const runTests = serverConfig.RUN_TESTS;
logger.info(`Run Tests? ${runTests}`);

const tests = async () => {
    // tests:
    const emailServiceTests = require('./services/email/send-email-service');
    await emailServiceTests();
};

module.exports = async () => {
    let totalTests;
    let totalTestsPassed;
    if (runTests) {
        await tests();
        const TestHandler = require('./test-handler');
        totalTests = TestHandler.getTotalTests();
        totalTestsPassed = TestHandler.getTotalTestsPassed();
        logger.info(`Tests Passed: ${totalTestsPassed}/${totalTests}`);
    };

    return runTests ? totalTestsPassed === totalTests : true;
};


