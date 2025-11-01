// Client to call our Node backend API
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export async function searchMovies(query) {
  const res = await fetch(`${API_BASE}/api/search?query=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Search failed')
  return res.json()
}

export async function getMovie(id) {
  const res = await fetch(`${API_BASE}/api/movie/${id}`)
  if (!res.ok) throw new Error('Fetch movie failed')
  return res.json()
}
