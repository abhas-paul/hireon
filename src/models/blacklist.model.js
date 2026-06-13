const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true // I want to make sure the same token isn't blacklisted twice
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // I'm telling MongoDB to automatically delete this document after 24 hours (matches the 1d JWT expiry)
    }
});

const tokenBlacklistModel = mongoose.model("BlacklistToken", blacklistTokenSchema);

module.exports = tokenBlacklistModel;