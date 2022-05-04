const fs = require("fs");

module.exports = async (logger) => {
    const paths = ['./src/utils/logger/logs/'];
    const files = ['errors', 'exceptions', 'rejections'];
    let errs = [];

    try {
        paths.forEach(path => {
            files.forEach(file => {
                let checkPath = path + file + '.log';
                if (fs.existsSync(checkPath)) {
                    logger.info(`exists: ${checkPath}`)
                    fs.writeFile(checkPath, "", { flag: 'w' }, (err) => {
                        if (err) {
                            errs.push(err);
                        } else {
                            logger.info(`cleared: ${checkPath}`)
                        };
                    });
                };
            });
        });
    } catch (err) {
        errs.push(err);
    };

    if (errs.length > 0) {
        errs.forEach(err => {
            logger.error(err);
        });
    };

};