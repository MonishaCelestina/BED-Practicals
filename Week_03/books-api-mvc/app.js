const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController"); // Import controllers
const validateBook = require("./middlewares/validateBook");

const app = express();

app.use(bodyParser.json()); // Parse incoming JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.get("/", (req, res) => {
  res.send("Welcome to the Books API!");
});

// Define individual routes for each controller function
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.delete("/books/:id", booksController.deleteBook);
app.post("/books", validateBook, booksController.createBook); // Add validateBook before createBook
app.put("/books/:id", validateBook, booksController.updateBook); // Add validateBook before updateBook

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
