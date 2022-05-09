let events = {};

const publish = (event, args) => {
    try {

        console.log('PUBLISHING!');
        console.log(`event: ${event}`);
        console.log(`args: ${args}`);

        if (events[event]) {
            events[event].forEach(f => {
                f(args);
            });
        }

    } catch (err) {
        console.log(`publish err: ${err}`);
    }

};

const subscribe = (event, callback) => {
    try {
        console.log('subscribing!! ', event, callback);
        if ((event in events) && (events[event].includes(callback))) {
            console.log(`Sub Event already exists. Event: ${event}`);
            return;
        };

        events[event] = events[event] || [];
        events[event].push(callback);

    } catch (err) {
        console.log(`subscribe err: ${err}`);
    }

};

const unsubscribe = (event, callback) => {
    try {
        if (events[event]) {
            events[event] = events[event].filter(f => f !== callback);
        }

    } catch (err) {
        console.log(`unsubscribe err: ${err}`);
    }

};

const getEvents = () => {
    return events;
};

const eventBus = {
    publish,
    subscribe,
    unsubscribe,
    getEvents
};

module.exports = eventBus;