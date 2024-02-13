const { Router } = require("express");
const bookRouter = Router();

const { addBook, getAllBooks, updateBooksAuthor, deleteBookByTitle } = require("./controllers");

bookRouter.get("/", getAllBooks);
bookRouter.post("/addBook", addBook);
bookRouter.put("/updateAuthor", updateBooksAuthor);
bookRouter.delete("/deleteBook", deleteBookByTitle);

module.exports = bookRouter;
