const { Router } = require("express");

const authController = require("../controllers/auth.controller.js");

const authRouter = Router();

authRouter.post("/register", authController.registerUser);

module.exports = authRouter;