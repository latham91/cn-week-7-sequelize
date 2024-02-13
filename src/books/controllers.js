const Book = require("./model");

// Add a book
// POST /books/addBook
exports.addBook = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

        const book = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
        });

        return res.status(201).json({ success: true, message: `${book.title} was added`, data: book });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding book", error: error.errors });
    }
};

// Get all books
// GET /books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        return res.status(200).json({ success: true, message: "All books returned", count: books.length, data: books });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error getting books", error: error.errors });
    }
};

// Update book
// PUT /books/updateBook/:title
exports.updateBookByTitle = async (req, res) => {
    try {
        const searchTitle = req.params.title;
        const { title, author, genre } = req.body;

        if (!searchTitle) {
            return res.status(400).json({ success: false, message: "searchTitle is required" });
        }

        const book = await Book.update({ title, author, genre }, { where: { title: searchTitle } });

        if (book[0] === 0) {
            return res.status(404).json({ success: false, message: `Book with title ${searchTitle} not found` });
        }

        return res
            .status(200)
            .json({ success: true, message: `${searchTitle} was updated`, updatedData: { title, author, genre } });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error updating book", error: error.errors });
    }
};

// Delete a book by title
// DELETE /books/deleteBook
exports.deleteBookByTitle = async (req, res) => {
    try {
        const { title } = req.params;

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

        const book = await Book.destroy({ where: { title } });

        if (book[0] === 0) {
            return res.status(404).json({ success: false, message: `Book with title ${title} not found` });
        }

        return res.status(200).json({ success: true, message: `${title} was deleted`, data: [] });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error deleting book", error: error.errors });
    }
};

// Delete all books
// DELETE /books
exports.deleteAllBooks = async (req, res) => {
    try {
        await Book.destroy({ truncate: true });
        return res.status(200).json({ success: true, message: "All books were deleted", data: [] });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error deleting all books", error: error.errors });
    }
};
