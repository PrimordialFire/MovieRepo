import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchMovies } from '../services/api'

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function doSearch(e) {
    e?.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError('')
    try {
      const data = await searchMovies(query)
      setResults(data.results || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Optional: initial popular movies if backend implements it later
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-3">Search Movies</h1>
      <form className="input-group mb-4" onSubmit={doSearch}>
        <input className="form-control" placeholder="Search by title..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-primary" type="submit" disabled={loading}>Search</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="row g-3">
        {results.map((m) => (
          <div className="col-6 col-md-4 col-lg-3" key={m.id}>
            <div className="card h-100">
              {m.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w342${m.poster_path}`} className="card-img-top" alt={m.title} />
              )}
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{m.title}</h6>
                <p className="card-text text-muted small">{m.release_date}</p>
                <Link to={`/movie/${m.id}`} className="btn btn-sm btn-outline-primary mt-auto">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
