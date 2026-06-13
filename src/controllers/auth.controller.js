const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const doesUserExists = await userModel.findOne({
        $or: [ {username}, {email} ]
    })

    if(doesUserExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const  user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {id:user._id, username:user.username},
        process.env.JWT_SEC,
        {expiresIn: "1d"}
    )

}

module.exports = {
    registerUser,
}