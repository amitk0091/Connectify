const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/Connectify`).then(console.log('db connected'));

const userSchema = mongoose.Schema({
    name: String,
    password : String,
    phoneNumber : Number
})

module.exports = mongoose.model('users', userSchema);