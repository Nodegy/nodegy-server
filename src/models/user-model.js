module.exports = mongoose => {
    const User = mongoose.model(
        'User',
        mongoose.Schema({
            eid: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                unique: true
            },
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
            preferences: {
                type: Object,
                default: {
                    timezone: {
                        type: String,
                        default: 'GMT-0500'
                    },
                    timeFormat: {
                        type: Number,
                        default: 24,
                    },
                    theme: {
                        type: String,
                        default: 'white'
                    }
                }
            },
            roles: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Role"
                }
            ],
            username: {
                type: String,
                required: true,
                unique: true,
                lowercase: true
            },
            vCode: {
                type: String,
                required: true,
            },
        }, { timestamps: true })
    );
    return User;

};
