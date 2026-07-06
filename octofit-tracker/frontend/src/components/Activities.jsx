import { useEffect, useState } from 'react';
import { fetchList, getCodespaceName } from '../api';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchList('activities')
      .then((data) => mounted && setItems(data))
      .catch((err) => mounted && setError(err.message));
    return () => { mounted = false };
  }, []);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <p className="text-muted">API base: {getCodespaceName() || 'localhost (fallback)'}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={it.id || it._id || idx} className="list-group-item">
            {it.name || it.title || JSON.stringify(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
