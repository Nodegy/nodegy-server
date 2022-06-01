"use strict";
module.exports = mongoose => {
    const Role = mongoose.model('Role', mongoose.Schema({
        name: {
            type: String,
            require: true
        }
    }));
    return Role;
};
