// backend/models/UserModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    }
    // Password bỏ qua vì đang test giả
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');