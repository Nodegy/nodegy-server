"use strict";
module.exports = {
    DISCORD_AVATAR_URL: 'https://cdn.discordapp.com/attachments/406994985246916624/887078166408073246/rev-1-3d.jpg',
    LOG_TO_FILE: false,
    LOG_TO_DB: false,
    LOG_DB_REQUESTS: true,
    CLEAR_LOGS_MAINTENANCE: true,
    DB_MAINTENANCE: false,
    REQUIRE_SIGNUP_KEY: true,
    RUN_TESTS: process.env.NODE_ENV === 'production' ? true : false,
};
