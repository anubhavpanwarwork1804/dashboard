import React, { useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('');

  const checkBackend = async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setStatus(data.message);
    } catch (err) {
      setStatus('Failed to connect to backend!');
    }
  };

  return (
    <div className="App">
      <h1>DevOps Dashboard</h1>
      <button onClick={checkBackend}>Check Python Service</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
