import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

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
            <Link to="/game">Play Game</Link>
          </li>
          <li />
        </ul>
        <div className="nav-account">
          <Link to="/user/register" className="btn btn-signup">
            Sign Up
          </Link>
          <Link to="/user/login" className="btn btn-login">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}
