const db = require('../../../models');
const Notification = db.notification;

module.exports = async (eid, notifications) => {
    try {
        notifications.forEach(notification => {
            notification = new Notification({
                eid: eid,
                message: notification.message,
                service: notification.service,
                success: notification.success,
                type: notification.type,
            });
        });
        await Notification.insertMany(notifications);
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    };
};

