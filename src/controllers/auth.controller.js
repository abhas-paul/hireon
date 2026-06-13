const userModel = require("../models/user.model.js");
const tokenBlacklistModel = require("../models/blacklist.model.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Handles new user registration, hashes passwords, and sets an auth cookie.
 */
async function registerUser(req, res, next) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide username, email and password"
            });
        }

        const doesUserExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (doesUserExists) {
            return res.status(400).json({
                success: false,
                message: "Account already exists with this email address or username"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        if (!process.env.JWT_SEC) {
            throw new Error("JWT_SEC environment variable is missing");
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        );

        // Setting a secure cookie configuration for production stability
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        // Passing the error to my global express handler instead of letting it drop
        next(error);
    }
}

/**
 * Verification and token generation for user login.
 */
async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;

        // I need to ensure both fields are provided before querying the database
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPassValid = await bcrypt.compare(password, user.password);

        if (!isPassValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (!process.env.JWT_SEC) {
            throw new Error("JWT_SEC environment variable is missing");
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        );

        // Standardizing production security flags for my authentication cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            success: true,
            message: "User loggedIn successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        // Passing runtime and configuration errors directly to my global error handler
        next(error);
    }
}

/**
 * Invalidate JWT and clear auth cookie
 */
async function logoutUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (token) {
            try {
                await tokenBlacklistModel.create({ token });
            } catch (err) {
                // I'm ignoring duplicate key errors just in case I double-click logout
                if (err.code !== 11000) throw err;
            }
        }

        // I'm clearing the cookie using the exact same security flags it was set with
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully."
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};