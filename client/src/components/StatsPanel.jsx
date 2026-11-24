import { useEffect, useState } from "react";
import { fetchStats } from "../api/books";

function StatsPanel({ refreshKey }) {
  const [result, setResult] = useState({ key: null, stats: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetchStats(controller.signal)
      .then((stats) => setResult({ key: refreshKey, stats, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setResult({ key: refreshKey, stats: null, error: err.message });
      });

    return () => controller.abort();
  }, [refreshKey]);

  const loading = result.key !== refreshKey;
  const error = loading ? null : result.error;
  const stats = result.stats;

  if (error) {
    return <p className="error">Could not load statistics: {error}</p>;
  }

  if (!stats) {
    return <p>Loading statistics...</p>;
  }

  const genres = Object.entries(stats.byGenre);

  return (
    <section className="stats">
      <div>
        <span className="stat-label">Total</span>
        <strong>{stats.total}</strong>
      </div>
      <div>
        <span className="stat-label">Read</span>
        <strong>{stats.read}</strong>
      </div>
      <div>
        <span className="stat-label">Unread</span>
        <strong>{stats.unread}</strong>
      </div>
      <div>
        <span className="stat-label">Average rating</span>
        <strong>
          {stats.averageRating === null ? "-" : stats.averageRating}
        </strong>
      </div>
      <div className="stat-genres">
        <span className="stat-label">By genre</span>
        <strong>
          {genres.length === 0
            ? "-"
            : genres.map(([genre, count]) => `${genre}: ${count}`).join(", ")}
        </strong>
      </div>
    </section>
  );
}

export default StatsPanel;
