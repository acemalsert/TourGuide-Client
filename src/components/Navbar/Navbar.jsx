import React from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiration');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className='navbar'>
      <nav className='nav-container'>
        <ul className='nav-links'>
          <li><Link to="/"><img className="nav-tour-guide-logo-img" src="../../public/tour-guide-logo.jpeg" alt="" /></Link></li>
          <li><Link to="/destinations">Destinations</Link></li>
          <li><Link to="/guides">Guides</Link></li>
          <li><Link to="/">Map</Link></li>
        </ul>
        <div className="nav-right"> {/* Sağ taraf için bir div ekliyoruz */}
          {isLoggedIn ? (
            <div className='nav-links'>
              <Link to="/profile">
                <img 
                  src="../src/assets/default_profile_photo.webp" 
                  alt="Profile"
                  className="profile-photo"
                />
              </Link>
              <Link onClick={handleSignOut}>
                Sign Out
              </Link>
            </div>
          ) : (
            <div className='nav-links'>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
