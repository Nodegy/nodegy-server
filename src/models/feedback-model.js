module.exports = mongoose => {
    const Feedback = mongoose.model(
        'Feedback',
        mongoose.Schema({
            body: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            handled: {
                type: Boolean,
                default: false
            },
            subject: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            },
        }, { timestamps: true })
    );
    return Feedback;

};