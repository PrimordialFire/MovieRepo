// Client to call our Node backend API
const API_BASE = import.meta.env.VITE_API_BASE || 'https://movieexp-api.onrender.com'

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
