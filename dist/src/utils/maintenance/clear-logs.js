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
const fs = require('fs');
module.exports = (logger) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = ['./src/utils/logger/logs/'];
    const files = ['errors', 'exceptions', 'rejections'];
    let errs = [];
    try {
        paths.forEach(path => {
            files.forEach(file => {
                let checkPath = path + file + '.log';
                if (fs.existsSync(checkPath)) {
                    logger.info(`exists: ${checkPath}`);
                    fs.writeFile(checkPath, '', { flag: 'w' }, (err) => {
                        if (err) {
                            errs.push(err);
                        }
                        else {
                            logger.info(`cleared: ${checkPath}`);
                        }
                        ;
                    });
                }
                ;
            });
        });
    }
    catch (err) {
        errs.push(err);
    }
    ;
    if (errs.length > 0) {
        errs.forEach(err => {
            logger.error(err);
        });
    }
    ;
});
