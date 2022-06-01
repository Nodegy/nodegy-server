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
const db = require('../../models');
const Role = db.role;
module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    Role.estimatedDocumentCount((err, count) => __awaiter(void 0, void 0, void 0, function* () {
        if (!err && (count < db.ROLES.length)) {
            const allRoles = yield Role.find();
            db.ROLES.forEach((role) => {
                const doesNotExist = allRoles.every((activeRole) => activeRole.name !== role);
                if (doesNotExist) {
                    switch (role) {
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
    }));
});
