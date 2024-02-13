const { Router } = require("express");
const bookRouter = Router();

const { addBook, getAllBooks, deleteBookByTitle, updateBookByTitle, deleteAllBooks } = require("./controllers");

bookRouter.get("/", getAllBooks);
bookRouter.post("/addBook", addBook);
bookRouter.put("/updateBook/:title", updateBookByTitle);
bookRouter.delete("/deleteBook/:title", deleteBookByTitle);
bookRouter.delete("/", deleteAllBooks);

module.exports = bookRouter;
