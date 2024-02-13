require("dotenv").config();
const express = require("express");

// Import the Book model
const Book = require("./books/model");

// Get the port from .env or use 5001
const PORT = process.env.PORT || 5001;

// Create an express app
const app = express();

const syncTables = async () => {
    try {
        // Sync models with the database
        await Book.sync();
    } catch (error) {
        console.log("Error syncing the table: ", error);
    }
};

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
    // Sync the tables
    syncTables();
    console.log(`Server is running on port ${PORT}`);
});
