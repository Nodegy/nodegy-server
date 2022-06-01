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
const db = require('../../../models');
const User = db.user;
const { handleResponse } = require('../../_utils/response-handlers/index');
const service = 'mod find all users';
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eid = req.cookies.eid;
    let err;
    let users;
    let updatedUserArray;
    try {
        users = yield User.find().populate('roles', '-__v');
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
            }
            ;
            return container;
        });
    }
    catch (error) {
        err = error;
    }
    finally {
        yield handleResponse(res, {
            data: err ? null : updatedUserArray,
            eid: eid,
            err: err,
            isErr: err || !updatedUserArray ? true : false,
            status: err ? 500 : updatedUserArray ? 200 : 400,
            service: service
        });
    }
    ;
});
