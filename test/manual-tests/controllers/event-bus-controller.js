const eventBus = require('../../../src/event-bus');

const testFunc1 = (args) => {
    console.log(`testFunc1: ${args}`);
};

const testFunc2 = (args) => {
    console.log(`testFunc2: ${args * 2}`);
};


exports.getEvents = async (req, res) => {
    try {
        const events = eventBus.getEvents();
        console.log('\nEVENTS');
        console.log(events);
        res.status(200).send(events);

    } catch (err) {
        res.status(500).send({
            message: `Publish Error ${err}`
        });
    };

};

exports.publish = async (req, res) => {
    try {
        console.log('\nPUBLISH');

        eventBus.publish(req.body.publish, 1843);

        console.log(eventBus.getEvents());
        res.status(200).send({ message: 'publish' });

    } catch (err) {
        res.status(500).send({
            message: `Publish Error ${err}`
        });
    };

};

exports.subscribe = async (req, res) => {
    try {
        console.log('\nSUBSCRIBE');

        let inputFunc = req.body.inputFunc == 'testFunc1' ? testFunc1 : testFunc2;
        eventBus.subscribe(req.body.subscribe, inputFunc);

        console.log(eventBus.getEvents());
        res.status(200).send({ message: 'subscribe' });

    } catch (err) {
        res.status(500).send({
            message: `Subscribe Error ${err}`
        });
    };

};

exports.unsubscribe = async (req, res) => {
    try {
        console.log('\nUNSUBSCRIBE');

        eventBus.subscribe('testFunc', testFunc);

        console.log(eventBus.getEvents());
        res.status(200).send({ message: 'unsubscribe' });

    } catch (err) {
        res.status(500).send({
            message: `Unsubscribe Error ${err}`
        });
    };

};

