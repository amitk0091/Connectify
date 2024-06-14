//schema -> model -> class -> object

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        unique: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email is not valid'],
        required: [true, 'Email is required']
    }, name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long']
    },
    about: {
        type: String
    },
    profilePic: {
        type: String
    },
    coverPic: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, 'Phone number must be at least 10 characters long'],
        maxlength: [10, 'Phone number must be at most 10 characters long'],
        unique: true,
        match: [/^\d{10}$/, 'Phone number is not valid']
    },
    isOnline : {
        type: Boolean,
        default: false
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

// required: [true, 'Phone number is required'],

module.exports = mongoose.model('User', userSchema);
