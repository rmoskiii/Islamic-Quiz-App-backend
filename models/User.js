const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 }, // 👈 default score for new users
    email: { type: String },
    group: { type: String },  // For group competitions later

});

module.exports = mongoose.model("User", userSchema);
