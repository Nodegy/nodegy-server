const db = require('../../models');
const Notification = db.notification;

module.exports = async (eid) => {
    try {
        let notifications = await Notification.find({ eid: eid });
        notifications = notifications.map(notification => {
            return {
                createdAt: notification.createdAt,
                message: notification.message,
                service: notification.service,
                success: notification.success,
                type: notification.type,
            };
        });

        return Promise.resolve(notifications);
    } catch (err) {
        return Promise.reject(err);
    }

};