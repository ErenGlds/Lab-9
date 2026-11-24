import express from "express";
import cors from "cors";
import { getAllBooks, getBookById, createBook } from "./booksStore.js";
import { parseId, pickBookFields, validateBook } from "./validate.js";

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get("/api/books", async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
});

app.get("/api/books/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "id must be a positive integer" });
  }

  const book = await getBookById(id);
  if (!book) {
    return res.status(404).json({ error: `Book with id ${id} not found` });
  }

  res.json(book);
});
app.post("/api/books", async (req, res) => {
  const result = validateBook(pickBookFields(req.body));
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  const created = await createBook(result.value);
  if (created.conflict) {
    return res.status(409).json({
      error: `A book titled "${result.value.title}" by ${result.value.author} already exists`,
    });
  }

  res.status(201).location(`/api/books/${created.book.id}`).json(created.book);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
