import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <img className="hero-logo" src={logo} alt="logo" />
        <p className="hero-title">Caro VN</p>
      </div>
      <div className="btn-group">
        <Link to="/game" className="btn btn-hero">
          Player vs Player
        </Link>
        <Link to="/game" className="btn btn-hero disabled">
          Player vs Computer
        </Link>
        <Link to="/game" className="btn btn-hero disabled">
          Play Online
        </Link>
      </div>
    </div>
  );
}
