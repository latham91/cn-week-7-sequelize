const Book = require("./model");

// Add a book
// POST /books/addBook
exports.addBook = async (req, res) => {
    try {
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

// Update author
// PUT /books/updateAuthor
exports.updateBooksAuthor = async (req, res) => {
    try {
        const book = await Book.update({ author: req.body.newAuthor }, { where: { title: req.body.title } });

        if (!book) {
            return res.status(404).json({ success: false, message: `Book with title ${req.body.title} not found` });
        }

        return res.status(200).json({
            success: true,
            message: `Author of ${req.body.title} updated`,
            data: {
                title: req.body.title,
                author: req.body.newAuthor,
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error updating author", error: error.errors });
    }
};

// Delete a book by title
// DELETE /books/deleteBook
exports.deleteBookByTitle = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

        const book = await Book.destroy({ where: { title: req.body.title } });

        if (!book) {
            return res.status(404).json({ success: false, message: `Book with title ${req.body.title} not found` });
        }

        return res.status(200).json({ success: true, message: `${req.body.title} was deleted`, data: [] });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error deleting book", error: error.errors });
    }
};
