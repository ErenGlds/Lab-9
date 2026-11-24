import { GENRES } from "../constants";

function Filters({ filters, onChange }) {
  return (
    <div className="filters">
      <input
        type="search"
        placeholder="Search title or author"
        value={filters.q}
        onChange={(e) => onChange({ q: e.target.value })}
      />

      <select
        value={filters.genre}
        onChange={(e) => onChange({ genre: e.target.value })}
      >
        <option value="">All genres</option>
        {GENRES.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select
        value={filters.read}
        onChange={(e) => onChange({ read: e.target.value })}
      >
        <option value="">Read and unread</option>
        <option value="true">Read</option>
        <option value="false">Unread</option>
      </select>

      <select
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value })}
      >
        <option value="">Default order</option>
        <option value="title">Sort by title</option>
        <option value="author">Sort by author</option>
        <option value="year">Sort by year</option>
        <option value="rating">Sort by rating</option>
      </select>

      <select
        value={filters.order}
        onChange={(e) => onChange({ order: e.target.value })}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default Filters;
