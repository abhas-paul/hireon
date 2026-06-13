const { Router } = require("express");
const authController = require("../controllers/auth.controller.js");

const authRouter = Router();

/**
 * @route       POST /api/auth/register
 * @description Register a new user, hash password, and set authentication cookie
 * @access      Public
 */
authRouter.post("/register", authController.registerUser);

/**
 * @route       POST /api/auth/login
 * @description Authenticate user, verify password, and set authentication cookie
 * @access      Public
 */
authRouter.post("/login", authController.loginUser);

authRouter.post("/logout", authController.logoutUser);

module.exports = authRouter;