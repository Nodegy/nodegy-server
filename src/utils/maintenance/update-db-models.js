const { user } = require('../models');
const db = require('../models');
const User = db.user;

exports.updateUsers = async (logger) => {
    try {
        const allUsers = await User.find();

        allUsers.forEach(async (existingUser) => {
            logger.info(`Existing User: ${existingUser}`);

            const newUser = new User({
                eid: existingUser.eid,
                username: existingUser.username,
                email: existingUser.email,
                password: existingUser.password,
                roles: existingUser.roles,
                preferences: existingUser.preferences,
            });

            const confirmDelete = await User.findByIdAndRemove(existingUser._id);

            if (confirmDelete) {
                logger.info(`delete confirmed for ID: ${existingUser._id}`);
                await newUser.save(newUser);
            };
        });

    } catch (err) {
        console.log(
            `Action: Maintenance Updating Users. Error: ${err}`
        );
    };

};

module.exports = async () => {
    logger.info('maintaining DB');
    // await this.updateUsers()

    logger.info('DB maintenance complete');
};