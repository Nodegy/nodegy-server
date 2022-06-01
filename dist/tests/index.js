"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logger = require('../src/utils/logger');
const serverConfig = require('../src/server-config');
const { totalTests } = require('./test-handler');
const runTests = serverConfig.RUN_TESTS;
logger.info(`Run Tests? ${runTests}`);
const tests = () => __awaiter(void 0, void 0, void 0, function* () {
    // tests:
    const emailServiceTests = require('./services/email/send-email-service');
    yield emailServiceTests();
});
module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    let totalTests;
    let totalTestsPassed;
    if (runTests) {
        yield tests();
        const TestHandler = require('./test-handler');
        totalTests = TestHandler.getTotalTests();
        totalTestsPassed = TestHandler.getTotalTestsPassed();
        logger.info(`Tests Passed: ${totalTestsPassed}/${totalTests}`);
    }
    ;
    return runTests ? totalTestsPassed === totalTests : true;
});
