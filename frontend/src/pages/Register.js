import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    uuid: '',
    email: '',
    password: '',
    password2: '',
    contactLanguage: '',
    phoneNumber: ''
  });
  
  const { name, uuid, email, password, password2, contactLanguage, phoneNumber } = formData;
  const { register, isAuthenticated, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    setError(null);
  }, [isAuthenticated, navigate, setError]);
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (password !== password2) {
      setError('Passwords do not match');
    } else {
      const newUser = {
        name,
        uuid,
        email,
        password,
        contactLanguage,
        phoneNumber
      };
      
      await register(newUser);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <p>Create your reindeer owner account</p>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="uuid">Unique Identifier</label>
            <input
              type="text"
              id="uuid"
              name="uuid"
              value={uuid}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contactLanguage">Contact Language</label>
            <select
              id="contactLanguage"
              name="contactLanguage"
              value={contactLanguage}
              onChange={onChange}
              required
            >
              <option value="">Select Language</option>
              <option value="NORD">Nord</option>
              <option value="SØR">Sør</option>
              <option value="LULE">Lule</option>
              <option value="PITE">Pite</option>
              <option value="UME">Ume</option>
              <option value="ENARE">Enare</option>
              <option value="SKOLT">Skolt</option>
              <option value="KILDIN">Kildin</option>
              <option value="AKKALA">Akkala</option>
              <option value="TER">Ter</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
        
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;