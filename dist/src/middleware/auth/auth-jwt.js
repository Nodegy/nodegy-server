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
const jwt = require('jsonwebtoken');
const db = require('../../models');
const User = db.user;
const Role = db.role;
const verifyToken = (req, res, next) => {
    let token = req.cookies.accessToken;
    if (!token) {
        res.status(403).send({
            message: 'No token provided!'
        });
        return;
    }
    ;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: 'Unauthorized!'
            });
            return;
        }
        ;
        req.userId = decoded.id;
        next();
    });
};
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.userId);
        if (!user) {
            res.status(404).send({
                message: 'Action: Admin? User not found.'
            });
            return;
        }
        ;
        const roles = yield Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                next();
                return;
            }
            ;
        }
        ;
        res.status(403).send({
            message: 'Action: Authorization. Error: Require Admin Role.'
        });
        return;
    }
    catch (err) {
        res.status(500).send({
            message: `Action: Admin? Error: ${err}`
        });
    }
    ;
});
const isModerator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.userId);
        if (!user) {
            res.status(404).send({
                message: 'Action: Moderator? User not found.'
            });
            return;
        }
        ;
        const roles = yield Role.find({ _id: { $in: user.roles } });
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
    }
    catch (err) {
        res.status(500).send({
            message: `Action: Moderator? Error: ${err}`
        });
    }
    ;
});
const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};
module.exports = authJwt;
