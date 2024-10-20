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
    <div className='container'>
      <div className='navbar'>
        <nav>
          <ul>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/guides">Guides</Link></li>
            <li><Link to="/">Map</Link></li>
            <li><Link to="/about">About</Link></li>

            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile"> 
                    <img 
                      src="../src/assets/default_profile_photo.webp" 
                      alt="Profile"
                      className="profile-photo"
                    />
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="btn btn-danger">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
