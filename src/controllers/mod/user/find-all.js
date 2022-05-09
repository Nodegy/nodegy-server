const db = require('../../../models');
const User = db.user;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'mod find all users';

module.exports = async (req, res) => {
    const eid = req.cookies.eid;
    let err;
    let users;
    let updatedUserArray;
    try {
        users = await User.find().populate('roles', '-__v');
        updatedUserArray = users.map(item => {
            const container = {};
            container['_id'] = item['_id'];
            container['email'] = item['email'];
            container['username'] = item['username'];
            container['createdAt'] = item['createdAt'];
            container['updatedAt'] = item['updatedAt'];
            container['roles'] = [];
            container['timezone'] = item.preferences['timezone'];
            for (let i = 0; i < item.roles.length; i++) {
                container['roles'].push(item['roles'][i]['name']);
            };
            return container;
        });

    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: err ? null : updatedUserArray,
            eid: eid,
            err: err,
            isErr: err || !updatedUserArray ? true : false,
            status: err ? 500 : updatedUserArray ? 200 : 400,
            service: service
        });
    };
};


