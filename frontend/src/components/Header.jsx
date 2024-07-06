import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <header>
      <nav>
        <Link to="/">Hexlet Chat</Link>
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
