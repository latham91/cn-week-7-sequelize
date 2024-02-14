const express = require("express");
const genreRouter = express.Router();

const { getAllGenres, addNewGenre, getBooksByGenreName } = require("./controllers");

genreRouter.get("/", getAllGenres);
genreRouter.post("/addGenre", addNewGenre);
genreRouter.get("/:genreName", getBooksByGenreName);

module.exports = genreRouter;
