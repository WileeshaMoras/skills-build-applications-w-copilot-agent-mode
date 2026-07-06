import { useEffect, useState } from 'react';
import { fetchList, getCodespaceName } from '../api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchList('leaderboard')
      .then((data) => mounted && setItems(data))
      .catch((err) => mounted && setError(err.message));
    return () => { mounted = false };
  }, []);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <p className="text-muted">API base: {getCodespaceName() || 'localhost (fallback)'}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ol className="list-group list-group-numbered">
        {items.map((it, idx) => (
          <li key={it.id || it._id || idx} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{it.username || it.name || JSON.stringify(it)}</span>
            <span className="badge bg-primary rounded-pill">{it.score ?? it.points ?? '-'}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
