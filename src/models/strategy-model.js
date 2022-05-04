module.exports = mongoose => {
    const Strategy = mongoose.model(
        'Strategy',
        mongoose.Schema({
            active: {
                type: Boolean,
                default: false
            },
            activeStratData: {
                type: Object,
                required: true,
                default: {
                    conditions: {
                        type: Array,
                        default: [
                            {
                                name: {
                                    type: String,
                                },
                                val: {

                                }
                            }
                        ],
                    },
                    lastTrigger: {
                        type: String,
                        enum: ['Open Long',
                            'Close Long',
                            'Open Short',
                            'Close Short',
                            null],
                        default: null,
                    },
                    positionState: {
                        type: String,
                        enum: [
                            'long',
                            'short',
                            null
                        ],
                        default: null
                    },
                },
            },
            alerts: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Alert"
                }
            ],
            conditionsReady: {
                type: Array,
            },
            eid: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            name: {
                type: String,
                required: true
            },
            notes: {
                type: String,
            },
            stratData: {
                type: Array,
                required: true,
                default: [{
                    conditions: {
                        type: Array,
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
                    },
                    position: {
                        type: String,
                        enum: ['Open Long',
                            'Close Long',
                            'Open Short',
                            'Close Short']
                    },
                    requiredConditions: {
                        type: String,
                        enum: ['one', 'all'],
                        default: 'all'
                    }
                }],
            },
            symbol: {
                type: String,
                required: true
            },

        }, { timestamps: true })
    );
    return Strategy;

};