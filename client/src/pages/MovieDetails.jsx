import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { createReview, deleteReviewById, listReviewsForItem, updateReview } from '../services/reviews'

function ReviewForm({ existing, onSave, onCancel }) {
  const [rating, setRating] = useState(existing?.rating || 5)
  const [text, setText] = useState(existing?.text || '')
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ rating: Number(rating), text }) }} className="mb-3">
      <div className="row g-2 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">Rating</label>
        </div>
        <div className="col-auto">
          <input type="number" min={1} max={10} value={rating} className="form-control" onChange={(e) => setRating(e.target.value)} />
        </div>
      </div>
      <textarea className="form-control my-2" rows="3" placeholder="Write your thoughts..." value={text} onChange={(e) => setText(e.target.value)} />
      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
        {onCancel && <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [reviews, setReviews] = useState([])
  const [editingId, setEditingId] = useState(null)
  const { user } = useAuth()

  const avgRating = useMemo(() => {
    if (!reviews.length) return null
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0)
    return (sum / reviews.length).toFixed(1)
  }, [reviews])

  async function load() {
    setLoading(true)
    setError('')
    try {
      const [m, revs] = await Promise.all([
        getMovie(id),
        listReviewsForItem({ itemId: id, itemType: 'movie' })
      ])
      setMovie(m)
      setReviews(revs)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id])

  async function handleCreate({ rating, text }) {
    try {
      setActionError('')
      await createReview({ itemId: id, itemType: 'movie', rating, text, user })
      await load()
    } catch (e) {
      setActionError(e.message || 'Failed to create review')
    }
  }

  async function handleUpdate({ rating, text }) {
    try {
      setActionError('')
      await updateReview({ id: editingId, rating, text })
      setEditingId(null)
      await load()
    } catch (e) {
      setActionError(e.message || 'Failed to update review')
    }
  }

  async function handleDelete(rid) {
    try {
      setActionError('')
      await deleteReviewById(rid)
      await load()
    } catch (e) {
      setActionError(e.message || 'Failed to delete review')
    }
  }

  if (loading) return <div className="container py-4">Loading...</div>
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>
  if (!movie) return null

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-md-4">
          {movie.poster_path && (
            <img alt={movie.title} className="img-fluid rounded" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          )}
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p className="text-muted">{movie.release_date} • {movie.runtime} min</p>
          <p>{movie.overview}</p>
          {avgRating && <p className="fw-bold">Average Rating: {avgRating} / 10 ({reviews.length} reviews)</p>}
        </div>
      </div>

      <hr className="my-4" />

  <h4>Reviews</h4>
  {actionError && <div className="alert alert-danger">{actionError}</div>}
      {!user && <div className="alert alert-info">Please login to add a review.</div>}
      {user && !editingId && (
        <div className="card card-body mb-3">
          <h6 className="mb-2">Add your review</h6>
          <ReviewForm onSave={handleCreate} />
        </div>
      )}

      <div className="list-group">
        {reviews.map((r) => (
          <div key={r.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{r.userEmail}</strong> &nbsp;
                <span className="badge text-bg-primary">{r.rating}/10</span>
              </div>
              {user?.uid === r.userId && (
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-secondary" onClick={() => setEditingId(r.id)}>Edit</button>
                  <button className="btn btn-outline-danger" onClick={() => handleDelete(r.id)}>Delete</button>
                </div>
              )}
            </div>
            {editingId === r.id ? (
              <ReviewForm existing={r} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
            ) : (
              <p className="mb-0 mt-2">{r.text}</p>
            )}
          </div>
        ))}
        {!reviews.length && <div className="text-muted">No reviews yet.</div>}
      </div>
    </div>
  )
}
