const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    gender: { type: String },
    birthDay: String,
    birthMonth: String,
    birthYear: String,

    role: {
        type: String,
        enum: ["customer", "shipper"],
        required: true,
        default: "customer"
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');