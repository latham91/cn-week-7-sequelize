const Genre = require("./model");

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
