# Movie Review Platform# Create Movieexp



A full-stack Movie Review application built with React, Node.js, Express, and Firebase.description



## Features> created by [create-create-app](https://github.com/uetchy/create-create-app).



- 🎬 Search for movies using The Movie Database (TMDB) API## Usage

- 📝 Create, read, update, and delete movie reviews

- ⭐ Rate movies on a scale of 1-10```bash

- 👥 View reviews from other users with average ratingsnpx create-movieexp <name>

- 🔐 User authentication with Firebase Auth```

- 💾 Cloud storage with Firebase Firestore

## Template string reference

## Tech Stack

> Don't forget to remove this before publishing your package!

### Frontend

- React 18 with Vite- {{name}} => create-Movieexp

- React Router for navigation- {{upper name}} => CREATE-MOVIEEXP

- Bootstrap 5 for styling- {{lower name}} => create-movieexp

- Firebase Web SDK for auth and Firestore- {{capital name}} => CreateMovieexp

- {{capital name space=true}} => Create Movieexp

### Backend- {{camel name}} => createMovieexp

- Node.js with Express- {{snake name}} => create_movieexp

- TMDB API proxy endpoints- {{kebab name}} => create-movieexp

- CORS enabled for client requests- {{space name}} => create Movieexp

- {{uuid}} => fc787122-3957-45d2-b1c8-ec05adcc3ccb

### Database- {{upper (uuid)}} => F51F3D12-C64C-4B0F-9155-40FD9A7E6059

- Firebase Firestore for reviews storage- {{description}} => description

- Firebase Authentication for user management- {{author}} => Mahapu 

- {{email}} => mahapuramafikeng6@gmail.com

## Prerequisites- {{contact}} => Mahapu  <mahapuramafikeng6@gmail.com>

- {{license}} => MIT

1. **Node.js** (v18 or higher)- {{year}} => 2025

2. **Firebase Project** - Create one at [Firebase Console](https://console.firebase.google.com/)- {{custom}} =>  (undefined until it is defined in `extra` field in `create` function arguments)

3. **TMDB API Key** - Get one at [TMDB Settings](https://www.themoviedb.org/settings/api)

See https://github.com/uetchy/create-create-app#template for the further details.

## Setup Instructions

### 1. Clone and Install

```bash
cd create-Movieexp
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Email/Password** authentication:
   - Authentication > Sign-in method > Email/Password > Enable
4. Create a **Firestore Database**:
   - Firestore Database > Create database > Start in test mode
5. Get your web app config:
   - Project Settings > Your apps > Web app > Config

### 3. Client Setup

```bash
cd client
cp .env.example .env
```

Edit `client/.env` and fill in your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE=http://localhost:4000
```

### 4. Server Setup

```bash
cd ../server
cp .env.example .env
```

Edit `server/.env` and add your TMDB API key:

```env
TMDB_API_KEY=your_tmdb_api_key
PORT=4000
```

### 5. Firestore Security Rules

In Firebase Console > Firestore Database > Rules, add:

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

## Running the Application

### Start the backend server (Terminal 1):

```bash
cd server
npm start
```

Server will run on `http://localhost:4000`

### Start the frontend client (Terminal 2):

```bash
cd client
npm run dev
```

Client will run on `http://localhost:5173`

## Project Structure

```
create-Movieexp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar)
│   │   ├── context/       # Auth context provider
│   │   ├── pages/         # Page components (Home, MovieDetails, Login, etc.)
│   │   ├── services/      # API and Firestore services
│   │   ├── firebase.js    # Firebase initialization
│   │   ├── App.jsx        # Main app with routing
│   │   └── main.jsx       # Entry point
│   └── .env               # Environment variables
├── server/                # Node.js backend
│   ├── index.js           # Express server with TMDB proxy
│   └── .env               # Server environment variables
└── README.md
```

## Pages (5+ Required)

1. **Home** (`/`) - Search and browse movies
2. **Movie Details** (`/movie/:id`) - View movie info and reviews
3. **Login** (`/login`) - User login
4. **Register** (`/register`) - User registration
5. **My Reviews** (`/my-reviews`) - View and manage your reviews
6. **About** (`/about`) - About the platform

## API Endpoints

### Backend (Express)
- `GET /` - Health check
- `GET /api/search?query=movie` - Search movies
- `GET /api/movie/:id` - Get movie details

### Firestore Collections
- `reviews` - User reviews with fields:
  - `itemId` - Movie ID
  - `itemType` - "movie"
  - `rating` - 1-10
  - `text` - Review content
  - `userId` - User's Firebase UID
  - `userEmail` - User's email
  - `createdAt` - Timestamp
  - `updatedAt` - Timestamp

## Deployment Options

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel or Netlify
3. Add environment variables in dashboard
4. Deploy

### Backend (Render/Railway)
1. Push code to GitHub
2. Create new web service
3. Point to `server` directory
4. Add environment variables
5. Deploy

### Database
Firebase Firestore is already cloud-hosted!

## Development Tips

- Keep Firebase and TMDB API keys secure (never commit .env files)
- Use Firebase Emulator Suite for local testing
- Monitor Firestore usage in Firebase Console
- Check Network tab in browser DevTools for API calls

## Marking Criteria Checklist

- ✅ **Frontend (40 points)**: React, Bootstrap, responsive pages
- ✅ **Backend (40 points)**: Node.js Express API, external TMDB integration
- ✅ **Code Quality (20 points)**: Clean structure, comments, deployment ready
- ✅ **5+ pages**: Home, Movie Details, Login, Register, My Reviews, About

## License

MIT

---

Built for Lab Test 2 assignment - Movie Review Platform
