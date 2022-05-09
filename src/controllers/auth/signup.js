const config = require('../../config/auth.config');
const db = require('../../models');
const User = db.user;
const Role = db.role;
const SignupKey = db.signupKey;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { genVCode } = require('../../services/generators/index');
const sendVerificationEmail = require('../../services/email/send-verification-code');
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'Signup';
const frontEndIsBeta = process.env.FRONT_END_BETA_SIGNUPS == 'true';

module.exports = async (req, res) => {
    let confirm;
    let err;
    let payload;
    let status;

    try {
        const vCode = genVCode();
        const role = await Role.findOne({ name: 'user' });
        const user = new User({
            eid: '',
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 1),
            roles: [role.id],
            vCode: vCode,
            preferences: {
                timezone: req.body.timezone,
                timeFormat: 24,
                theme: 'white'
            },
        });

        let eidCheck = null;

        while (true) {
            user.eid = db.mongoose.Types.ObjectId();
            eidCheck = await User.findOne({ eid: user.eid });
            if (!eidCheck) {
                break;
            };
        };

        const confirmUser = await user.save(user);

        if (!confirmUser) {
            err = 'user not saved';
            status = 400;
        };

        if (!err) {
            confirm = await sendVerificationEmail(user.email, vCode);

            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 3 * 24 * 60 * 60 * 1000,
            });

            const cookieParams = {
                maxAge: 3 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
                path: '/',
                secure: true,
                httpOnly: true
            };

            res.cookie('accessToken', token, cookieParams);
            res.cookie('id', confirmUser._id, cookieParams);
            res.cookie('eid', user.eid, cookieParams);

            payload = generatePayload(user);
        };

    } catch (error) {
        err = error;
        status = 500;
        if (err && frontEndIsBeta) {
            await SignupKey.findByIdAndUpdate(
                { _id: found._id },
                { $set: { isUsed: false } },
                { new: true });
        };

    } finally {
        await handleResponse(res, {
            data: err ? null : confirm ? payload : null,
            eid: null,
            err: err,
            isErr: err ? true : false,
            status: status ? status : 200,
            service: service
        });
    };
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
