const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
