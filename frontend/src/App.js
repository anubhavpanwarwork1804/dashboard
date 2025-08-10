import React, { useState } from 'react';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const user = e.target.username.value;
    const pass = e.target.password.value;
    if (user === 'annu' && pass === 'tnhi') {
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  // Python backend check
  const checkBackend = async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setStatus(data.message);
    } catch (err) {
      setStatus('Failed to connect to backend!');
    }
  };

  // Java backend name submit
  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    if (name.length === 0 || name.length > 10) {
      setError('Name must be 1-10 characters');
      return;
    }
    try {
      const res = await fetch('/java-api/name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.name);
      } else {
        setError(data.error || 'Error from Java backend');
      }
    } catch {
      setError('Failed to connect to Java backend!');
    }
  };

  if (!loggedIn) {
    return (
      <div className="App">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input name="username" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>DevOps Dashboard</h1>
      <button onClick={checkBackend}>Check Python Service</button>
      <p>{status}</p>

      <h2>Java Service: Enter Your Name (max 10 chars)</h2>
      <form onSubmit={handleNameSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={10}
          placeholder="Your name"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ fontSize: '2em', color: '#4caf50', margin: '2em' }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default App;