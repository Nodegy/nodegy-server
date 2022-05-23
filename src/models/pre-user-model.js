module.exports = mongoose => {
    const PreUser = mongoose.model(
        'PreUser',
        mongoose.Schema({
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true,
                minlength: 6,
                max: 64
            },
            username: {
                type: String,
                required: true,
                lowercase: true
            },
            vCode: {
                type: String,
                required: true,
            },
        }, { timestamps: true })
    );
    return PreUser;
};
