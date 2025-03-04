import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { email, password } = formData;
  const { login, isAuthenticated, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [submitting, setSubmitting] = useState(false);
  
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
    setSubmitting(true);
    
    try {
      await login(email, password);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="auth-form-container">
      <h2>Log In</h2>
      <p>Sign in to access your reindeer registry account</p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            required
            minLength="6"
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting}
        >
          {submitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      
      <div className="auth-links">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;