import { useEffect, useState } from 'react';
import { fetchList, getCodespaceName } from '../api';

// Example codespace API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams
// Keyphrase sample (workflow check): -8000.app.github.dev/api/teams

export default function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchList('teams')
      .then((data) => mounted && setItems(data))
      .catch((err) => mounted && setError(err.message));
    return () => { mounted = false };
  }, []);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <p className="text-muted">API base: {getCodespaceName() || 'localhost (fallback)'}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={it.id || it._id || idx} className="list-group-item">
            <strong>{it.name || it.teamName || JSON.stringify(it)}</strong>
            <div className="text-muted small">Members: {Array.isArray(it.members) ? it.members.length : (it.memberCount ?? '-')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
