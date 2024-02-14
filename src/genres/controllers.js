const Genre = require("./model");
const Book = require("../books/model");

// Get all genres
// GET /genres
exports.getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll();

        if (genres.length === 0) {
            return res.status(404).json({ success: false, count: genres.length, message: "No genres found" });
        }

        return res
            .status(200)
            .json({ success: true, message: "All genres returned", count: genres.length, data: genres });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error getting all genres", error: error.errors });
    }
};

// Add new genre
// POST /genres/addGenre
exports.addNewGenre = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        const genre = await Genre.create({ name: req.body.name });

        return res.status(201).json({ success: true, message: `${genre.name} was added`, data: genre });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding genre", error: error.errors });
    }
};

// Get books by genre
// GET /genres/:genreName
exports.getBooksByGenreName = async (req, res) => {
    try {
        const { genreName } = req.params;

        const books = await Genre.findOne({
            where: { name: genreName },
            include: [
                {
                    model: Book,
                    as: "Books",
                    attributes: ["id", "title"],
                },
            ],
        });

        if (!books) {
            return res.status(404).json({ success: false, message: "Genre not found" });
        }

        return res
            .status(200)
            .json({ success: true, message: `Books by genre ${genreName} returned`, count: books.length, data: books });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error getting books by genre", error: error.errors });
    }
};
