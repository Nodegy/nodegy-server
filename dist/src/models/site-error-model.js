"use strict";
module.exports = mongoose => {
    const SiteError = mongoose.model('SiteError', mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        service: {
            type: String,
            require: true
        },
        function: {
            type: String,
            require: true
        },
        message: {
            type: String,
            require: true
        },
        payload: {
            type: Object
        },
        stack: {
            type: String,
            require: true
        },
    }, { timestamps: true }));
    return SiteError;
};
