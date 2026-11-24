import express from "express";
import cors from "cors";
import {
  listBooks,
  getBookById,
  createBook,
  replaceBook,
  deleteBook,
} from "./booksStore.js";
import {
  parseId,
  pickBookFields,
  validateBook,
  validateListQuery,
} from "./validate.js";

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get("/api/books", async (req, res) => {
  const parsed = validateListQuery(req.query);
  if (parsed.error) {
    return res.status(400).json({ error: parsed.error });
  }

  const books = await listBooks(parsed.value);
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

function sendReplaceResult(res, result, data) {
  if (result.notFound) {
    return res.status(404).json({ error: "Book not found" });
  }
  if (result.conflict) {
    return res.status(409).json({
      error: `A book titled "${data.title}" by ${data.author} already exists`,
    });
  }
  res.json(result.book);
}

app.put("/api/books/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "id must be a positive integer" });
  }

  const validated = validateBook(pickBookFields(req.body));
  if (validated.error) {
    return res.status(400).json({ error: validated.error });
  }

  const result = await replaceBook(id, validated.value);
  sendReplaceResult(res, result, validated.value);
});

app.patch("/api/books/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "id must be a positive integer" });
  }

  if (
    typeof req.body !== "object" ||
    req.body === null ||
    Array.isArray(req.body)
  ) {
    return res
      .status(400)
      .json({ error: "Request body must be a JSON object" });
  }

  const existing = await getBookById(id);
  if (!existing) {
    return res.status(404).json({ error: `Book with id ${id} not found` });
  }

  const validated = validateBook({ ...existing, ...pickBookFields(req.body) });
  if (validated.error) {
    return res.status(400).json({ error: validated.error });
  }

  const result = await replaceBook(id, validated.value);
  sendReplaceResult(res, result, validated.value);
});

app.delete("/api/books/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "id must be a positive integer" });
  }

  const result = await deleteBook(id);
  if (result.notFound) {
    return res.status(404).json({ error: `Book with id ${id} not found` });
  }

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
