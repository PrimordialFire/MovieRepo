import dotenv from 'dotenv'
import { createApp } from './app.js'

dotenv.config()

const PORT = process.env.PORT || 4000
const TMDB_API_KEY = process.env.TMDB_API_KEY

const app = createApp({ apiKey: TMDB_API_KEY })

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  if (!TMDB_API_KEY) {
    console.warn('⚠️  Warning: TMDB_API_KEY not set in .env')
  }
})
