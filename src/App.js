import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('user') || null;
  });

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('user', username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <header>
        <p>Vítej, {user}!</p>
        <button onClick={handleLogout}>Odhlásit se</button>
      </header>
      <Board />
    </div>
  );
}

export default App;
