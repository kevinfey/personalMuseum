import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
function Header() {
  return (
    <nav>
      <ul className="nav-links">
        <span></span>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li className="title">
          <Link to="/main">gallery</Link>
        </li>

        <li>
          <Link to="/">register</Link>
        </li>
        <span></span>
      </ul>
    </nav>
  );
}
export default Header;
