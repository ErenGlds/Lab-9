const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, { method = "GET", body, signal } = {}) {
  const options = { method, signal };

  if (body !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message =
      data && typeof data.error === "string"
        ? data.error
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function buildQuery(params) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      search.set(key, String(value));
    }
  });

  const text = search.toString();
  return text ? `?${text}` : "";
}

export function fetchBooks(params = {}, signal) {
  return request(`/api/books${buildQuery(params)}`, { signal });
}

export function fetchStats(signal) {
  return request("/api/stats", { signal });
}

export function createBook(book) {
  return request("/api/books", { method: "POST", body: book });
}

export function replaceBook(id, book) {
  return request(`/api/books/${id}`, { method: "PUT", body: book });
}

export function patchBook(id, changes) {
  return request(`/api/books/${id}`, { method: "PATCH", body: changes });
}

export function deleteBook(id) {
  return request(`/api/books/${id}`, { method: "DELETE" });
}
