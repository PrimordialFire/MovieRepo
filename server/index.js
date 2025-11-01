import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE = 'https://api.themoviedb.org/3'

app.use(cors())
app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Movie Review API Server' })
})

// Search movies
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query
    if (!query) return res.status(400).json({ error: 'Query parameter required' })
    
    const url = `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Failed to search movies' })
  }
})

// Get movie details
app.get('/api/movie/:id', async (req, res) => {
  try {
    const { id } = req.params
    const url = `${TMDB_BASE}/movie/${id}?api_key=${TMDB_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Movie details error:', error)
    res.status(500).json({ error: 'Failed to fetch movie details' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  if (!TMDB_API_KEY) {
    console.warn('⚠️  Warning: TMDB_API_KEY not set in .env')
  }
})
