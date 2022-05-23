const db = require('../../models');
const PreUser = db.preUser;
const bcrypt = require('bcrypt');
const { genVCode } = require('../../services/generators/index');
const sendVerificationEmail = require('../../services/email/send-verification-code');
const { handleResponse } = require('../_utils/response-handlers/index');
const service = 'Signup';

module.exports = async (req, res) => {
    let confirm;
    let err;
    let status;

    try {
        const vCode = genVCode();
        const preUser = new PreUser({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 1),
            username: req.body.username,
            vCode: vCode,
        });

        const confirmPreUser = await preUser.save(preUser);

        if (!confirmPreUser) {
            err = 'user not saved';
            status = 400;
        };

        if (!err) {
            confirm = true;
            // confirm = await sendVerificationEmail(preUser.email, vCode);
        };

    } catch (error) {
        err = error;
        status = 500;

    } finally {
        await handleResponse(res, {
            data: null,
            eid: null,
            err: err,
            isErr: err ? true : false,
            status: status ? status : 200,
            service: service
        });
    };
};

