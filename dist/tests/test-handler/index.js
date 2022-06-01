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
const logger = require('../../src/utils/logger');
class TestHandler {
    constructor() {
        this.testsPassed = 0;
        this.totalTests = 0;
    }
    ;
    getTotalTests() {
        return this.totalTests;
    }
    ;
    getTotalTestsPassed() {
        return this.testsPassed;
    }
    ;
    runTest(service, functionName, test) {
        return __awaiter(this, void 0, void 0, function* () {
            this.totalTests += 1;
            logger.info(`Testing: ${service} [${functionName}]`);
            const testPassed = yield test();
            if (testPassed) {
                const msg = `Test ${service} ${functionName}: ${testPassed ? 'Passed' : 'Failed'}`;
                if (!testPassed) {
                    logger.error(msg, 'error');
                    return;
                }
                ;
                this.testsPassed += 1;
                logger.info(msg);
            }
            ;
        });
    }
    ;
}
;
module.exports = new TestHandler();
