const mongoose = require('mongoose');

const ApgwdSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: false
    },
    LATITUDE: {
        type: Number,
        required: false
    },
    LONGITUDE: {
        type: Number,
        required: false
    },
    "Geology or Principal Aquifer": {
        type: String,
        required: false
    },
    "SITE ID": {
        type: Number,
        required: false
    },
    PZ_ID: {
        type: Number,
        required: false
    },
    WIMS_Station: {
        type: String,
        required: false
    },
    "GW_Station or App Code": {
        type: String,
        required: false
    },
    DISTRICT: {
        type: String,
        required: false
    },
    MANDAL: {
        type: String,
        required: false
    },
    VILLAGE: {
        type: String,
        required: false
    },
    LOCATION: {
        type: String,
        required: false
    },
    "Drilled Depth": {
        type: Number,
        required: false
    }
});

const Apgwd = mongoose.model('apgwd_data', ApgwdSchema, 'apgwd_data');

module.exports = Apgwd;
