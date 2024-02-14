const express = require("express");
const genreRouter = express.Router();

const { getAllGenres, addNewGenre } = require("./controllers");

genreRouter.get("/", getAllGenres);
genreRouter.post("/addGenre", addNewGenre);

module.exports = genreRouter;
