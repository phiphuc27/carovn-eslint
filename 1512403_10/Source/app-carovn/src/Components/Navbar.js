import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import AccountSection from '../Containers/navUser';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img className="nav-logo" src={logo} alt="logo" />
            <p className="nav-title">Caro VN</p>
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">Player vs Computer</Link>
          </li>

          <li>
            <Link to="/game" className="disabled">
              Play Online
            </Link>
          </li>
          <li />
        </ul>
        <AccountSection />
      </div>
    </nav>
  );
}
