const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true, // Note: Mongoose unique is an index, custom messages go in the controller/error middleware
        trim: true,   // I'm trimming whitespace to prevent accidental spaces breaking login
        minlength: [3, "Username must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        trim: true,
        lowercase: true, // I'm forcing lowercase to ensure uniqueness checks aren't case-sensitive
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"] // I'm enforcing a minimum length for security
    }
}, {
    timestamps: true // I'm tracking when users are created or updated automatically
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;