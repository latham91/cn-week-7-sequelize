require("dotenv").config();
const express = require("express");

// Get the port from .env or use 5001
const PORT = process.env.PORT || 5001;

// Create an express app
const app = express();

// Add middleware to parse JSON
app.use(express.json());

// Server listens on the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
