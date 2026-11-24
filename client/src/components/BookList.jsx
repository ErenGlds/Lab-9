function BookList({ books }) {
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
        </li>
      ))}
    </ul>
  );
}

export default BookList;
