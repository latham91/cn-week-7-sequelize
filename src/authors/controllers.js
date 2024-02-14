const Book = require("../books/model");
const Author = require("./model");

exports.addNewAuthor = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        const newAuthor = await Author.create({ name });

        return res.status(201).json({ success: true, message: "Author added", data: newAuthor });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding author", error: error.errors });
    }
};

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        return res
            .status(200)
            .json({ success: true, message: "All authors returned", count: authors.length, data: authors });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error getting authors", error: error.errors });
    }
};

exports.getBooksByAuthor = async (req, res) => {
    try {
        const { author } = req.params;
        const books = await Author.findOne({
            where: { name: author },
            include: [
                {
                    model: Book,
                    attributes: { exclude: ["GenreId", "AuthorId"] },
                    include: ["Genre", "Author"],
                },
            ],
        });

        return res.status(200).json({ success: true, message: `Books by ${author} returned`, data: books });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error getting books by author", error: error.errors });
    }
};
