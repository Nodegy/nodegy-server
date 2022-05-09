module.exports = mongoose => {
    const Alert = mongoose.model(
        'Alert',
        mongoose.Schema({
            address: {
                type: String,
                required: true
            },
            eid: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            messages: {
                type: Array,
                default: [
                    {
                        position: {
                            type: String,
                            enum: [
                                'Open Long',
                                'Close Long',
                                'Open Short',
                                'Close Short'
                            ]
                        },
                        message: {
                            type: Object,
                            default: {
                                default: {
                                    type: Boolean,
                                },
                                text: {
                                    type: String
                                }
                            }
                        },
                    }
                ],
            },
            name: {
                type: String,
                required: true
            },
            notes: {
                type: String,
            },
            type: {
                type: String,
                enum:
                    [
                        'bot',
                        'email',
                        'discord'
                    ],
                required: true
            },

        }, { timestamps: true })
    );
    return Alert;

};