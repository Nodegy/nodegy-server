module.exports = mongoose => {
    const Archive = mongoose.model(
        'Archive',
        mongoose.Schema({
            activeStrategies: {
                type: Object,
            },
            alerts: {
                type: Object,
            },
            eid: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            strategies: {
                type: Object,
            },
            user: {
                type: Object,
            },
            webhooks: {
                type: Object,
            },
        }, { timestamps: true })
    );
    return Archive;

}