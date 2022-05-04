module.exports = mongoose => {
    const MailingListEmail = mongoose.model(
        'MailingListEmail',
        mongoose.Schema({
            email: {
                type: String,
                unique: true,
                required: true
            },
        }, { timestamps: true })
    );
    return MailingListEmail;
};