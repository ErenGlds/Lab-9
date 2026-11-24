import { useState } from "react";
import { GENRES } from "../constants";

function BookForm({ book, submitting, error, onSubmit, onCancel }) {
  const [title, setTitle] = useState(book ? book.title : "");
  const [author, setAuthor] = useState(book ? book.author : "");
  const [year, setYear] = useState(book ? String(book.year) : "");
  const [genre, setGenre] = useState(book ? book.genre : "fiction");
  const [read, setRead] = useState(book ? book.read : false);
  const [rating, setRating] = useState(
    book && book.rating !== null ? String(book.rating) : "",
  );

  const handleReadChange = (checked) => {
    setRead(checked);
    if (!checked) setRating("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      author,
      year: Number(year),
      genre,
      read,
      rating: rating === "" ? null : Number(rating),
    });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{book ? "Edit book" : "Add book"}</h2>

      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label>
        Author
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>

      <label>
        Year
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>

      <label>
        Genre
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {GENRES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label className="inline">
        <input
          type="checkbox"
          checked={read}
          onChange={(e) => handleReadChange(e.target.checked)}
        />
        Read
      </label>

      <label>
        Rating
        <select
          value={rating}
          disabled={!read}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">No rating</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      {error && <p className="error">{error}</p>}

      <div className="actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default BookForm;
