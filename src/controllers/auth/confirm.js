const db = require('../../models');
const PreUser = db.preUser;
const User = db.user;
const Role = db.role;
const SignupKey = db.signupKey;
const jwt = require('jsonwebtoken');
const { genVCode } = require('../../services/generators/index');
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'Confirm Signup';
const serverConfig = require('../../server-config');
const signupKeyRequired = serverConfig.REQUIRE_SIGNUP_KEY;

module.exports = async (req, res) => {
    let confirm;
    let err;
    let payload;
    let preUser;
    let user;

    try {
        preUser = await PreUser.findOne({ email: req.body.email, vCode: req.body.vCode });

        if (!preUser) {
            err = 'Invalid Email or Verification Code';
        };

        if (!err) {
            const role = await Role.findOne({ name: 'user' });
            const eid = await createEid();
            user = new User({
                eid: eid,
                email: preUser.email,
                password: preUser.password,
                preferences: {
                    timezone: req.body.timezone,
                    timeFormat: 24,
                    theme: 'white'
                },
                roles: [role.id],
                username: preUser.username,
                vCode: genVCode()
            });

            confirm = await user.save(user);

            let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 3 * 24 * 60 * 60 * 1000,
            });

            const cookieParams = {
                maxAge: 3 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
                path: '/',
                secure: true,
                httpOnly: true
            };

            res.cookie('accessToken', token, cookieParams);
            res.cookie('id', user._id, cookieParams);
            res.cookie('eid', user.eid, cookieParams);

            payload = generatePayload(user);
        };

    } catch (error) {
        err = error;
    } finally {
        await handleResponse(res, {
            data: err ? null : payload,
            eid: null,
            err: err,
            isErr: err || !confirm ? true : false,
            status: err ? 500 : confirm ? 200 : 400,
            service: service
        });
        await onConfirm(preUser, confirm, signupKeyRequired ? req.body.key : null);
    };
};

const createEid = async () => {
    let eidCheck = null;
    let eid;
    while (true) {
        eid = db.mongoose.Types.ObjectId();
        eidCheck = await User.findOne({ eid: eid });
        if (!eidCheck) {
            break;
        };
    };
    return eid;
};

const generatePayload = (user) => {
    return {
        user: {
            username: user.username,
            email: user.email,
            roles: ['user'],
        },
        preferences: user.preferences,
    };
};

const onConfirm = async (preUser, user, signupKey) => {
    try {
        if (signupKey) {
            await SignupKey.findOneAndUpdate({ key: signupKey }, { $set: { isUsed: true } });
        };
        if (preUser && user) {
            await PreUser.deleteMany({
                $or: [
                    { email: preUser.email },
                    { username: preUser.username }
                ]
            });
        };

    } catch (err) {
        console.log('err onConfirm: ', err)
    };
};