require("dotenv").config();
const express = require("express");
const sequelize = require("./db/connection");

// Import the Book model
const Book = require("./books/model");
const Genre = require("./genres/model");
const Author = require("./authors/model");

// Import routers
const bookRouter = require("./books/routes");
const genreRouter = require("./genres/routes");
const authorRouter = require("./authors/routes");

// Get the port from .env or use 5001
const PORT = process.env.PORT || 5001;

// Create an express app
const app = express();

const syncTables = async () => {
    // Define the relationships
    Genre.hasMany(Book);
    Book.belongsTo(Genre);

    Author.hasMany(Book);
    Book.belongsTo(Author);

    // Sync models with the database
    await Genre.sync();
    await Author.sync();
    await Book.sync();
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

// Routes
app.use("/books", bookRouter);
app.use("/genres", genreRouter);
app.use("/authors", authorRouter);

// Server listens on the port
app.listen(PORT, () => {
    // Sync the tables
    syncTables();

    console.log(`Server is running on port ${PORT}`);
});
