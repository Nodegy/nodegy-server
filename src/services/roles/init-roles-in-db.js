const db = require('../../models');
const Role = db.role;

module.exports = async () => {
    Role.estimatedDocumentCount(async (err, count) => {
        if (!err && (count < db.ROLES.length)) {

            const allRoles = await Role.find();
            db.ROLES.forEach((role) => {
                const doesNotExist = allRoles.every((activeRole) => activeRole.name !== role);

                if (doesNotExist) {
                    switch (role) {
                        case 'isConfirmed':
                            new Role({
                                name: 'isConfirmed'
                            }).save(err => {
                                if (err) {
                                    console.log('error', err);
                                }

                                console.log('added \'isConfirmed\' to roles collection');
                            });
                            break;

                        case 'user':
                            new Role({
                                name: 'user'
                            }).save(err => {
                                if (err) {
                                    console.log('error', err);
                                }

                                console.log('added \'user\' to roles collection');
                            });
                            break;

                        case 'moderator':
                            new Role({
                                name: 'moderator'
                            }).save(err => {
                                if (err) {
                                    console.log('error', err);
                                }

                                console.log('added \'moderator\' to roles collection');
                            });
                            break;

                        case 'admin':
                            new Role({
                                name: 'admin'
                            }).save(err => {
                                if (err) {
                                    console.log('error', err);
                                }

                                console.log('added \'admin\' to roles collection');
                            });
                            break;

                        default:
                            break;

                    }

                }
            });
        }
    });
};
