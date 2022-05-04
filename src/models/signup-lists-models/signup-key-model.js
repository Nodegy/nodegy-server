module.exports = mongoose => {
    const SignupKey = mongoose.model(
        'SignupKey',
        mongoose.Schema({
            key: {
                type: String,
                unique: true,
                required: true
            },
            isUsed: {
                type: Boolean,
                default: false
            }
        }, { timestamps: true })
    );
    return SignupKey;

};