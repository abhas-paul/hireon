require("dotenv").config();

const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");

connectDB();

PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})