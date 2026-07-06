export const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME;

export const getApiBase = () => {
  const codespace = getCodespaceName();
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/`;
  }
  // safe fallback to local dev server
  return `http://localhost:8000/api/`;
};

function extractItems(json) {
  if (Array.isArray(json)) return json;
  if (json == null) return [];
  if (Array.isArray(json.results)) return json.results;
  if (Array.isArray(json.data)) return json.data;
  if (Array.isArray(json.items)) return json.items;
  if (Array.isArray(json.docs)) return json.docs;
  // common pattern: body contains the array under the resource name
  const keys = Object.keys(json);
  for (const k of keys) {
    if (Array.isArray(json[k])) return json[k];
  }
  // otherwise return the object itself as single-item array
  return [json];
}

export async function fetchAllPages(url, init) {
  const collected = [];
  let next = url;
  while (next) {
    const res = await fetch(next, init);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const json = await res.json();
    const items = extractItems(json);
    collected.push(...items);
    // detect common pagination `next` property
    next = json && (json.next || json.next_page || json.nextUrl || null);
    // if next is a full path and empty, break
    if (!next) break;
  }
  return collected;
}

export async function fetchList(resource) {
  const base = getApiBase();
  const url = `${base}${resource}/`;
  return fetchAllPages(url, { headers: { 'Accept': 'application/json' } });
}
