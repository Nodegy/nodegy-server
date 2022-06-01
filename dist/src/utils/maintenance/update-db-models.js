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
const { user } = require('../models');
const db = require('../models');
const User = db.user;
exports.updateUsers = (logger) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield User.find();
        allUsers.forEach((existingUser) => __awaiter(void 0, void 0, void 0, function* () {
            logger.info(`Existing User: ${existingUser}`);
            const newUser = new User({
                eid: existingUser.eid,
                username: existingUser.username,
                email: existingUser.email,
                password: existingUser.password,
                roles: existingUser.roles,
                preferences: existingUser.preferences,
            });
            const confirmDelete = yield User.findByIdAndRemove(existingUser._id);
            if (confirmDelete) {
                logger.info(`delete confirmed for ID: ${existingUser._id}`);
                yield newUser.save(newUser);
            }
            ;
        }));
    }
    catch (err) {
        console.log(`Action: Maintenance Updating Users. Error: ${err}`);
    }
    ;
});
module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('maintaining DB');
    // await this.updateUsers()
    logger.info('DB maintenance complete');
});
