const { Router } = require("express");
const bookRouter = Router();

const {
    addBook,
    getAllBooks,
    deleteBookByTitle,
    updateBookByTitle,
    deleteAllBooks,
    getBookByAuthor,
    getBookByTitle,
} = require("./controllers");

bookRouter.get("/", getAllBooks);
bookRouter.get("/author/:authorId", getBookByAuthor);
bookRouter.get("/:title", getBookByTitle);
bookRouter.post("/addBook", addBook);
bookRouter.put("/updateBook/:title", updateBookByTitle);
bookRouter.delete("/deleteBook/:title", deleteBookByTitle);
bookRouter.delete("/", deleteAllBooks);

module.exports = bookRouter;
