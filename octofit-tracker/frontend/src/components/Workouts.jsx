import { useEffect, useState } from 'react';
import { fetchList, getCodespaceName } from '../api';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchList('workouts')
      .then((data) => mounted && setItems(data))
      .catch((err) => mounted && setError(err.message));
    return () => { mounted = false };
  }, []);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <p className="text-muted">API base: {getCodespaceName() || 'localhost (fallback)'}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={it.id || it._id || idx} className="list-group-item">
            <div><strong>{it.title || it.name || `Workout ${idx + 1}`}</strong></div>
            <div className="small text-muted">Duration: {it.duration ?? it.time ?? '-'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
