import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { deleteReviewById } from '../services/reviews'

export default function MyReviews() {
  const { user, loading: authLoading } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    if (!user) {
      setReviews([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    try {
      const q = query(collection(db, 'reviews'), where('userId', '==', user.uid))
      const snap = await getDocs(q)
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      items.sort((a, b) => {
        const ta = a.createdAt?.toMillis?.() ?? 0
        const tb = b.createdAt?.toMillis?.() ?? 0
        return tb - ta
      })
      setReviews(items)
    } catch (e) {
      setError(e.message || 'Failed to load your reviews')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) load()
  }, [user, authLoading])

  async function handleDelete(id) {
    await deleteReviewById(id)
    await load()
  }

  if (authLoading || loading) return <div className="container py-4">Loading...</div>
  if (!user) return <div className="container py-4"><div className="alert alert-warning">Please login to see your reviews.</div></div>

  return (
    <div className="container py-4">
      <h2 className="mb-3">My Reviews</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!reviews.length && <div className="text-muted">You haven't written any reviews yet.</div>}
      <div className="list-group">
        {reviews.map((r) => (
          <div key={r.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="badge text-bg-primary me-2">{r.rating}/10</span>
                <strong>{r.itemType === 'movie' ? 'Movie' : 'Item'} ID: {r.itemId}</strong>
              </div>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(r.id)}>Delete</button>
            </div>
            <p className="mb-0 mt-2">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
