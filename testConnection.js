require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

// MongoDB URI from your .env file
const uri = process.env.MONGODB_URI;

// Test MongoDB connection
async function testConnection() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");
    mongoose.connection.close(); // Close the connection after testing
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the script with an error code
  }
}

testConnection();
