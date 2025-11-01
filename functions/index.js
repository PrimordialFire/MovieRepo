import * as functions from 'firebase-functions'
import { createApp } from '../server/app.js'

// 1st gen Functions to avoid Blaze plan requirement
// Read TMDB key from runtime config: firebase functions:config:set tmdb.key=YOUR_KEY
// Fallback to env var if provided
const getApiKey = () => {
	try {
		return (functions.config().tmdb && functions.config().tmdb.key) || process.env.TMDB_API_KEY || ''
	} catch (e) {
		return process.env.TMDB_API_KEY || ''
	}
}

const app = createApp({ apiKey: getApiKey() })

export const api = functions.https.onRequest(app)
