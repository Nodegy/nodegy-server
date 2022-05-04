const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'development') {
    let counter = 0;
    mongoose.set("debug", (collectionName, method, query, doc) => {
        console.log('\x1b[1m', `\ncounter: ${counter}`);
        console.log('\x1b[36m%s', `${`collection: ${collectionName}`}\n${`method: ${method}`}`);
        console.log('\x1b[0m', JSON.stringify(query), doc);
        counter += 1;
    });
};

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.alert = require('./alert-model.js')(mongoose);
db.archive = require('./archive-model.js')(mongoose);
db.feedback = require('./feedback-model')(mongoose);
db.mailingListEmail = require('./signup-lists-models/mailing-list-email-model')(mongoose);
db.notification = require('./notification-model')(mongoose);
db.role = require('./role-model')(mongoose);
db.signupKey = require('./signup-lists-models/signup-key-model')(mongoose);
db.siteError = require('./site-error-model')(mongoose);
db.strategy = require('./strategy-model.js')(mongoose);
db.user = require('./user-model.js')(mongoose);
db.webhook = require('./webhook-model')(mongoose);

db.ROLES = ['isConfirmed', "user", "admin", "moderator"];

module.exports = db;

