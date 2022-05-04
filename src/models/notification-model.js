module.exports = mongoose => {
    const Notifications = mongoose.model(
        'Notifications',
        mongoose.Schema({
            eid: {
                type: mongoose.Schema.Types.ObjectId,
            },
            message: {
                type: String,
                required: true,
            },
            service: {
                type: String,
                required: true,
            },
            success: {
                type: Boolean,
                required: true,
            },
            type: {
                type: String,
                enum: [
                    'action',
                    'incoming',
                    'outgoing',
                    null
                ],
            },
        }, { timestamps: true })
    );
    return Notifications;

};
