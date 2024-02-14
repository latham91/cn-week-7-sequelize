const express = require("express");
const authorRouter = express.Router();

const { addNewAuthor, getAllAuthors } = require("./controllers");

authorRouter.post("/addAuthor", addNewAuthor);
authorRouter.get("/", getAllAuthors);

module.exports = authorRouter;
