# Movie Review Client# React + Vite



React frontend for the Movie Review Platform.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## Quick StartCurrently, two official plugins are available:



1. **Install dependencies** (if not already done):- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

   ```powershell- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

   npm install

   ```## React Compiler



2. **Configure environment**:The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

   - Edit `.env` file with your Firebase config

   - Get Firebase config from https://console.firebase.google.com/## Expanding the ESLint configuration



3. **Run development server**:If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

   ```powershell
   npm run dev
   ```

4. **Open browser**:
   - Navigate to http://localhost:5173/

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Environment Variables

Create a `.env` file in this directory with:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE=http://localhost:4000
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── Navbar.jsx
├── context/        # React context providers
│   └── AuthContext.jsx
├── pages/          # Page components (routes)
│   ├── Home.jsx
│   ├── MovieDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── MyReviews.jsx
│   └── About.jsx
├── services/       # API and Firebase services
│   ├── api.js      # Backend API calls
│   └── reviews.js  # Firestore review operations
├── firebase.js     # Firebase initialization
├── App.jsx         # Main app with routing
└── main.jsx        # Entry point
```

## Pages

1. **Home** - Search movies using TMDB API
2. **Movie Details** - View movie info and reviews, add/edit/delete your reviews
3. **Login** - User authentication
4. **Register** - Create new account
5. **My Reviews** - View all your reviews
6. **About** - Information about the platform

## Technologies

- React 18
- Vite (build tool)
- React Router (routing)
- Bootstrap 5 (styling)
- Firebase (auth + Firestore)

## Building for Production

```powershell
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard
