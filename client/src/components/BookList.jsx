function BookList({ books, busy, onEdit, onToggleRead, onRate, onDelete }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book">
          <div>
            <strong>{book.title}</strong> by {book.author}
            <div className="meta">
              {book.year} · {book.genre} · {book.read ? "Read" : "Unread"}
              {book.rating !== null && ` · ${book.rating}/5`}
            </div>
          </div>
          <div className="actions">
            <button onClick={() => onToggleRead(book)} disabled={busy}>
              {book.read ? "Mark unread" : "Mark read"}
            </button>
            <select
              value={book.rating ?? ""}
              disabled={!book.read || busy}
              onChange={(e) =>
                onRate(
                  book,
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
            >
              <option value="">No rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <button onClick={() => onEdit(book)} disabled={busy}>
              Edit
            </button>
            <button onClick={() => onDelete(book)} disabled={busy}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
