require("dotenv").config();
const express = require("express");
const sequelize = require("./db/connection");

// Get the port from .env or use 5001
const PORT = process.env.PORT || 5001;

// Create an express app
const app = express();

// Connect to the database

// Add middleware to parse JSON
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    try {
        res.status(200).json({ success: true, message: "API is healthy" });
    } catch (error) {
        res.status(500).json({ success: false, message: "API Error", error: error.message });
    }
});

// Server listens on the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
