import { useEffect, useState } from "react";
import {
  fetchBooks,
  createBook,
  replaceBook,
  patchBook,
  deleteBook,
} from "./api/books";
import Filters from "./components/Filters";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import StatsPanel from "./components/StatsPanel";

const INITIAL_FILTERS = { q: "", genre: "", read: "", sort: "", order: "asc" };

function App() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState({ key: null, books: [], error: null });
  const [form, setForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState(null);

  const requestKey = JSON.stringify([filters, reloadKey]);

  useEffect(() => {
    const controller = new AbortController();

    fetchBooks(filters, controller.signal)
      .then((data) => setResult({ key: requestKey, books: data, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setResult({ key: requestKey, books: [], error: err.message });
      });

    return () => controller.abort();
  }, [filters, requestKey]);

  const loading = result.key !== requestKey;
  const error = loading ? null : result.error;
  const books = result.books;

  const changeFilters = (changes) => {
    setFilters((current) => ({ ...current, ...changes }));
  };

  const openForm = (book) => {
    setFormError(null);
    setForm({ book });
  };

  const closeForm = () => {
    setFormError(null);
    setForm(null);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setFormError(null);

    try {
      if (form.book) {
        await replaceBook(form.book.id, data);
      } else {
        await createBook(data);
      }
      setForm(null);
      setReloadKey((key) => key + 1);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const runAction = async (action) => {
    setBusy(true);
    setActionError(null);

    try {
      await action();
      setReloadKey((key) => key + 1);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const toggleRead = (book) =>
    runAction(() =>
      patchBook(
        book.id,
        book.read ? { read: false, rating: null } : { read: true },
      ),
    );

  const rateBook = (book, rating) =>
    runAction(() => patchBook(book.id, { rating }));

  const removeBook = (book) => {
    if (!window.confirm(`Delete "${book.title}"?`)) return;
    runAction(() => deleteBook(book.id));
  };

  return (
    <div className="app">
      <h1>Reading List</h1>

      <StatsPanel refreshKey={reloadKey} />

      {form ? (
        <BookForm
          key={form.book ? form.book.id : "new"}
          book={form.book}
          submitting={submitting}
          error={formError}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      ) : (
        <button onClick={() => openForm(null)}>Add book</button>
      )}

      <Filters filters={filters} onChange={changeFilters} />

      {actionError && <p className="error">{actionError}</p>}

      {loading && <p>Loading books...</p>}

      {error && (
        <div className="error">
          <p>Could not load books: {error}</p>
          <button onClick={() => setReloadKey((key) => key + 1)}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && books.length === 0 && <p>No books found.</p>}

      {!loading && !error && books.length > 0 && (
        <BookList
          books={books}
          busy={busy}
          onEdit={openForm}
          onToggleRead={toggleRead}
          onRate={rateBook}
          onDelete={removeBook}
        />
      )}
    </div>
  );
}

export default App;
