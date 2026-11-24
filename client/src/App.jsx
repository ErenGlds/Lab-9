import { useEffect, useState } from "react";
import { fetchBooks } from "./api/books";
import Filters from "./components/Filters";
import BookList from "./components/BookList";

const INITIAL_FILTERS = { q: "", genre: "", read: "", sort: "", order: "asc" };

function App() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState({ key: null, books: [], error: null });

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

  return (
    <div className="app">
      <h1>Reading List</h1>

      <Filters filters={filters} onChange={changeFilters} />

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

      {!loading && !error && books.length > 0 && <BookList books={books} />}
    </div>
  );
}

export default App;
