import { useEffect, useState } from 'react';

function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch(() => setError('Backend is not reachable yet.'));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Store Rating System</h1>
      <p>React + Express + MySQL starter setup is ready.</p>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        {health ? (
          <pre>{JSON.stringify(health, null, 2)}</pre>
        ) : error ? (
          <p style={{ color: 'crimson' }}>{error}</p>
        ) : (
          <p>Connecting to backend...</p>
        )}
      </div>

      <h2 style={{ marginTop: '1.5rem' }}>Next steps</h2>
      <ul>
        <li>Install dependencies with npm install:all</li>
        <li>Start MySQL and create the database</li>
        <li>Copy backend/.env.example to backend/.env and update your DB settings</li>
        <li>Run npm run dev to start both services</li>
      </ul>
    </div>
  );
}

export default App;
