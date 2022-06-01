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
const axios = require('axios');
const { handleInternalError } = require('../../utils/internal-handlers/index');
const serverConfig = require('../../server-config');
module.exports = (symbol, name, action, positionMessage, url, currentTime) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = {
            username: 'Nodegy',
            avatar_url: serverConfig.DISCORD_AVATAR_URL,
            content: `New ${action} Alert!`,
            embeds: [
                {
                    fields: [
                        {
                            name: 'Details:',
                            value: `~ **Strategy**: ${name}\n~ **Symbol**: ${symbol.toUpperCase()}\n~ **Action**: ${action}\n${positionMessage}\n~ **Date/Time**: ${currentTime}`
                        }
                    ]
                }
            ]
        };
        yield axios.post(url, message);
    }
    catch (err) {
        handleInternalError({
            message: 'Error in Discord Service',
            err: err,
            service: 'Discord Service'
        });
    }
    ;
});
