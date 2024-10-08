import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginPageImage from '../../assets/login-page-image.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5008/api/Auth/Login', {
        email,
        password,
      });
  
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('expiration', response.data.expiration);
        navigate('/'); 
      }
    } catch (error) {
      alert('Incorrect credentials');
      console.error('Login error:', error);
    }
  };
  

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img 
                src= {loginPageImage}
                className="img-fluid" 
                alt="Sample" 
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input 
                    type="email" 
                    id="email" 
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                  <label className="form-label" htmlFor="email">Email address</label>
                </div>

                <div className="form-outline mb-3">
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control form-control-lg"
                    placeholder="Enter password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                    <a href="#!" className="link-danger">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;