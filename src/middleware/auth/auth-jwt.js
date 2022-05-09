const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config.js');
const db = require('../../models');
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.cookies.accessToken;

    if (!token) {
        res.status(403).send({
            message: 'No token provided!'
        });
        return;
    };

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: 'Unauthorized!'
            });
            return;
        };
        req.userId = decoded.id;
        next();
    });
};

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            res.status(404).send({
                message: 'Action: Admin? User not found.'
            });
            return;
        };

        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                next();
                return;
            };
        };

        res.status(403).send({
            message: 'Action: Authorization. Error: Require Admin Role.'
        });
        return;

    } catch (err) {
        res.status(500).send({
            message: `Action: Admin? Error: ${err}`
        });
    };

};

isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            res.status(404).send({
                message: 'Action: Moderator? User not found.'
            });
            return;
        };

        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if ((roles[i].name === 'moderator') || (roles[i].name === 'admin')) {
                next();
                return;
            }
        }

        res.status(403).send({
            message: 'Action: Authorization. Error: Require Moderator Role.'
        });
        return;

    } catch (err) {
        res.status(500).send({
            message: `Action: Moderator? Error: ${err}`
        });
    };

};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};

module.exports = authJwt;