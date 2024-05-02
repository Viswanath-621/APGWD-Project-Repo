const mongoose = require('mongoose');

const apgwdusersSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    DISTRICT: {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    }
});

const User = mongoose.model('apgwd_user', apgwdusersSchema, 'apgwd_user');
module.exports = User;
