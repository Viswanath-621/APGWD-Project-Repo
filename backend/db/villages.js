const mongoose = require('mongoose');

const CustomSchema = new mongoose.Schema({
    PZ_ID: {
        type: String,
        required: false
    },
    District: {
        type: String,
        required: false
    },
    Mandal: {
        type: String,
        required: false
    },
    Village: {
        type: String,
        required: false
    },
    Value: {
        type: String,
        required: false
    },
    updatetime: {
        type: String,
        required: false
    },
    finalvalue: {
        type: String,
        required: false
    }
});

const villages = mongoose.model('apgwd_villages', CustomSchema, 'apgwd_villages');

module.exports = villages;