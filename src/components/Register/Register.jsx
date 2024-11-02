import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import registerPageImage from '../../assets/tour-guide-login.jpeg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    const requestBody = {
      fullName: username,
      email: email,
      password: password,
      confirmPassword: repeatPassword,
      role: "user" 
    };

    try {
      const response = await fetch('http://localhost:5008/api/auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Kayıt başarılı olursa dashboard sayfasına yönlendir
        alert('Registration successful!');
        navigate('/');
      } else {
        // Hata durumunda kullanıcıyı bilgilendir
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div>
      <section className="vh-100 mt-3" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input 
                              type="text" 
                              id="form3Example1c" 
                              className="form-control"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)} 
                              required
                            />
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input 
                              type="email" 
                              id="form3Example3c" 
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input 
                              type="password" 
                              id="form3Example4c" 
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input 
                              type="password" 
                              id="form3Example4c2" 
                              className="form-control"
                              value={repeatPassword}
                              onChange={(e) => setRepeatPassword(e.target.value)}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example4c2">Repeat Password</label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree to all statements in <a href="#!">Terms of Service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>
                      </form>
                    </div>

                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src={registerPageImage}
                        className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;