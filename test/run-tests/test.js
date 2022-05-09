// let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/server');
let should = chai.should();

chai.use(chaiHttp);

require('./controllers/alert.controller')(server, chai);
// require('./controllers/auth.controller')(server, chai);
require('./controllers/feedback.controller')(server, chai);
require('./controllers/user.controller')(server, chai);
require('./controllers/webhook.controller')(server, chai);
