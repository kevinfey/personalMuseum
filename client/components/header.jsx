import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
function Header() {
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <Link to="/">Register</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/main">Main</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Header;
