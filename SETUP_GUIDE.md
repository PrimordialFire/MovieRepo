# SETUP GUIDE

Follow these steps to get your Movie Review Platform running:

## Step 1: Get Your API Keys

### Firebase Setup (5 minutes)
1. Go to https://console.firebase.google.com/
2. Click "Create a project" or select existing
3. Enter project name (e.g., "movie-review-app")
4. Enable Google Analytics (optional)
5. Click "Create project"

### Enable Firebase Authentication
1. In Firebase Console, click "Authentication" in left sidebar
2. Click "Get started"
3. Click "Email/Password" provider
4. Enable it and click "Save"

### Create Firestore Database
1. Click "Firestore Database" in left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select your region
5. Click "Enable"

### Get Firebase Config
1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>`
5. Register your app (name: "Movie Review Web")
6. Copy the firebaseConfig object values

### Get TMDB API Key
1. Go to https://www.themoviedb.org/
2. Create account or login
3. Go to https://www.themoviedb.org/settings/api
4. Click "Create" under "Request an API Key"
5. Choose "Developer"
6. Fill in the form (can use dummy data for student project)
7. Copy your API Key (v3 auth)

## Step 2: Configure Environment Variables

### Client Configuration
1. Open `client/.env` in your text editor
2. Replace the placeholder values with your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIza... (from Firebase config)
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:...
VITE_API_BASE=http://localhost:4000
```

### Server Configuration
1. Open `server/.env` in your text editor
2. Add your TMDB API key:

```env
TMDB_API_KEY=your_actual_tmdb_api_key_here
PORT=4000
```

## Step 3: Set Firestore Security Rules

1. In Firebase Console, go to "Firestore Database"
2. Click "Rules" tab
3. Replace the content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

4. Click "Publish"

## Step 4: Run the Application

### Terminal 1 - Start Backend Server:
```powershell
cd server
npm start
```

You should see:
```
🚀 Server running on http://localhost:4000
```

### Terminal 2 - Start Frontend Client:
```powershell
cd client
npm run dev
```

You should see:
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

## Step 5: Test the Application

1. Open browser to http://localhost:5173/
2. Click "Register" and create a test account
3. Search for a movie (e.g., "Inception")
4. Click on a movie to see details
5. Add a review with rating
6. Check "My Reviews" page

## Troubleshooting

### "TMDB_API_KEY not set" warning
- Make sure you created `server/.env` file
- Check the API key is correct (no extra spaces)

### Firebase errors
- Double-check all values in `client/.env` match exactly from Firebase console
- Make sure you enabled Email/Password authentication
- Verify Firestore is created

### "Failed to search movies" error
- Backend server must be running on port 4000
- Check TMDB API key is valid
- Test backend directly: http://localhost:4000/api/search?query=inception

### CORS errors
- Make sure backend is running
- Check VITE_API_BASE in client/.env matches server URL

## Next Steps

- Customize the styling in `client/src/App.css`
- Add more features (favorites, comments on reviews, etc.)
- Deploy to Vercel (frontend) and Render (backend)
- Add restaurant support using Yelp or Google Places API

Good luck with your Lab Test 2! 🚀
