const config = require("../../config/auth.config");
const db = require("../../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { notificationsStoreLoader, stratStoreLoader } = require("../loaders/index");
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'Signin';

module.exports = async (req, res) => {
    let eid;
    let err;
    let payload;
    let status;

    try {
        const user = await User.findOne({
            $or:
                [
                    { username: req.body.usernameOrEmail },
                    { email: req.body.usernameOrEmail }
                ]
        }).populate("roles", "-__v");

        if (!user) {
            err = 'user not found';
            status = 404;
        };

        if (!err) {
            eid = user.eid;
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                err = 'invalid password';
                status = 401;
            };
        };

        if (!err) {
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 3 * 24 * 60 * 60 * 1000,
            });
            payload = await generatePayload(user);
            const cookieParams = {
                maxAge: 3 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
                path: '/',
                secure: true,
                httpOnly: true
            };
            res.cookie('accessToken', token, cookieParams);
            res.cookie('id', user._id, cookieParams);
            res.cookie('eid', user.eid, cookieParams);
        };

    } catch (error) {
        err = error;
        status = 500;
    } finally {
        await handleResponse(res, {
            data: err ? null : payload,
            eid: eid,
            err: err,
            isErr: err ? true : false,
            status: status ? status : 200,
            service: service
        });
    };
};

const generatePayload = async (user) => {
    let authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name);
    }

    return {
        user: {
            username: user.username,
            email: user.email,
            roles: authorities,
        },
        preferences: {
            timezone: user.preferences.timezone || null,
            timeFormat: user.preferences.timeFormat || null,
            theme: user.preferences.theme || null,
        },
        stratStore: await stratStoreLoader(user.eid),
        notifications: await notificationsStoreLoader(user.eid)
    };
};
