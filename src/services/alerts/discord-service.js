const axios = require('axios');
const { handleInternalError } = require('../../utils/internal-handlers/index');
const serverConfig = require('../../server-config');

module.exports = async (symbol, name, action, positionMessage, url) => {
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
                            value: `~ **Strategy**: ${name}\n~ **Symbol**: ${symbol.toUpperCase()}\n~ **Action**: ${action}\n${positionMessage}`
                        }
                    ]
                }
            ]
        };
        await axios.post(url, message);

    } catch (err) {
        handleInternalError({
            message: 'Error in Discord Service',
            err: err,
            service: 'Discord Service'
        });
    };

};