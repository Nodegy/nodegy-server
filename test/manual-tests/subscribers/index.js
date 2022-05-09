const eventBus = require('../src/event-bus');

const testSubs = require('./subscribers/index');

eventBus.subscribe('testSub1', testSubs.test1);