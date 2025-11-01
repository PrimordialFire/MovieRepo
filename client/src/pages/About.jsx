export default function About() {
  return (
    <div className="container py-4">
      <h2 className="mb-3">About Movie Reviews</h2>
      <p>This is a Movie Review Platform built with:</p>
      <ul>
        <li><strong>Frontend:</strong> React, Vite, Bootstrap, React Router</li>
        <li><strong>Backend:</strong> Node.js with Express (TMDB API proxy)</li>
        <li><strong>Database:</strong> Firebase Firestore</li>
        <li><strong>Authentication:</strong> Firebase Auth</li>
      </ul>
      <p>Features include:</p>
      <ul>
        <li>Search for movies using The Movie Database (TMDB) API</li>
        <li>View detailed information about movies</li>
        <li>Create, read, update, and delete your own reviews</li>
        <li>See reviews from other users with average ratings</li>
        <li>User authentication and authorization</li>
      </ul>
      <p className="text-muted">Developed as part of Lab Test 2 assignment.</p>
    </div>
  )
}
