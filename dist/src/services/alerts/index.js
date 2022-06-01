"use strict";
const services = {};
services.bot = require('./bot-service');
services.discord = require('./discord-service');
services.email = require('./email-service');
module.exports = services;
