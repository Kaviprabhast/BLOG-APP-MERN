import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Blog Diaries</h1>
      </div>
      <nav className="navbar">
        <Link to="/subscribe" className="nav-link">Subscribe</Link>
        <Link to="/create" className="nav-link">Create Blog</Link>
        <Link to="/blogs" className="nav-link">My Blogs</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
