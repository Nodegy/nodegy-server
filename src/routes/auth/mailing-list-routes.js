const controller = require('../../controllers/auth/mailing-list/index');
const validators = require('../../middleware/validators/auth/mailing-list/index');
const { verifyMailingListAddress } = require('../../middleware');

module.exports = (app) => {
    app.post('/auth/mailinglist/add',
        [validators.addToList,
            verifyMailingListAddress],
        controller.addToList);
};
