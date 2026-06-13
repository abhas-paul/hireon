const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");

/**
 * @description Protect routes by verifying JWT signature and checking the token blacklist
 */
async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token not provided"
            });
        }

        // I verify the mathematical signature and expiry first before hitting the database
        const decoded = jwt.verify(token, process.env.JWT_SEC);

        // I must ensure this specific token wasn't revoked during a previous logout
        const isBlacklisted = await tokenBlacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token has been revoked"
            });
        }

        // I'm attaching the decoded user payload to the request for the next controller to use
        req.user = decoded;
        next();

    } catch (error) {
        // jwt.verify automatically throws an error if the token is tampered with or expired
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or expired token"
        });
    }
}

module.exports = { authUser };