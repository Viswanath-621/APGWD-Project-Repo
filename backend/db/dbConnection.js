const mongoose = require('mongoose');
const connectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://ajayajay142018:THszi8tuPRRKzMin@cluster0.6tkhn2s.mongodb.net/ajay?retryWrites=true&w=majority&appName=AtlasApp');
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectDB;