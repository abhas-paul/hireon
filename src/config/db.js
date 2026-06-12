const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    // I'm blocking the app from running if the connection string is completely missing
    if (!MONGO_URI) {
        console.error("Error: MONGO_URI is undefined.");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("Connected to MongoDB");
    } catch (error) {
        // I'm logging the crash and killing the process since my app requires the DB to function
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;