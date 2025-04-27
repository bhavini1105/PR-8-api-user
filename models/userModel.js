const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    password: String,
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    }
}, { timestamps: true });

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
