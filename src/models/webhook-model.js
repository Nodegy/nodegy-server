module.exports = mongoose => {
    const Webhook = mongoose.model(
        'Webhook',
        mongoose.Schema({
            eid: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            stratId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            symbol: {
                type: String,
                required: true
            },
            conditions: {
                type: Object,
                required: true,
                default: [
                    {
                        name: {
                            type: String,
                        },
                        val: {
                        },
                        valType: {
                        },
                    },
                ],
            }
        }, { timestamps: true })
    );
    return Webhook;

};