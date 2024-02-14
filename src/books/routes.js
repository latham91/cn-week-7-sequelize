const { Router } = require("express");
const bookRouter = Router();

const {
    addBook,
    getAllBooks,
    deleteBookByTitle,
    updateBookByTitle,
    deleteAllBooks,
    getBookByAuthor,
} = require("./controllers");

bookRouter.get("/", getAllBooks);
bookRouter.post("/addBook", addBook);
bookRouter.put("/updateBook/:title", updateBookByTitle);
bookRouter.delete("/deleteBook/:title", deleteBookByTitle);
bookRouter.delete("/", deleteAllBooks);
bookRouter.get("/author/:author", getBookByAuthor);

module.exports = bookRouter;
