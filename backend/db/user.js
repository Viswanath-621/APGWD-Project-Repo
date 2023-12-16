const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    }, 
    transfer: {
        type: [String], // Assuming transfer is an array of strings, adjust the type accordingly
        default: [],
      },
});

const User = mongoose.model('User',UserSchema);

module.exports = User;