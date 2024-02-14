const express = require("express");
const authorRouter = express.Router();

const { addNewAuthor, getAllAuthors, getBooksByAuthor } = require("./controllers");

authorRouter.post("/addAuthor", addNewAuthor);
authorRouter.get("/", getAllAuthors);
authorRouter.get("/:author", getBooksByAuthor);

module.exports = authorRouter;
