// src/components/auth/Register.js

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { isValidEmail } from '../../utils/helpers';

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
  
  const {
    name,
    uuid,
    email,
    password,
    password2,
    contactLanguage,
    phoneNumber
  } = formData;
  
  const { register, isAuthenticated, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // Clear any previous errors
    setError(null);
  }, [isAuthenticated, navigate, setError]);
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear specific field error when changing that field
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!name.trim()) errors.name = 'Name is required';
    if (!uuid.trim()) errors.uuid = 'Unique identifier is required';
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== password2) {
      errors.password2 = 'Passwords do not match';
    }
    
    if (!contactLanguage) {
      errors.contactLanguage = 'Please select a contact language';
    }
    
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      await register({
        name,
        uuid,
        email,
        password,
        contactLanguage,
        phoneNumber
      });
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <p>Create your reindeer registry account</p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your full name"
          />
          {formErrors.name && <div className="form-error">{formErrors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="uuid">Unique Identifier</label>
          <input
            type="text"
            id="uuid"
            name="uuid"
            value={uuid}
            onChange={onChange}
            placeholder="Enter a unique identifier"
          />
          {formErrors.uuid && <div className="form-error">{formErrors.uuid}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
          />
          {formErrors.email && <div className="form-error">{formErrors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter a password (min. 6 characters)"
          />
          {formErrors.password && <div className="form-error">{formErrors.password}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            placeholder="Confirm your password"
          />
          {formErrors.password2 && <div className="form-error">{formErrors.password2}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="contactLanguage">Contact Language</label>
          <select
            id="contactLanguage"
            name="contactLanguage"
            value={contactLanguage}
            onChange={onChange}
          >
            <option value="">Select a language</option>
            <option value="NORD">Northern Sami</option>
            <option value="SØR">Southern Sami</option>
            <option value="LULE">Lule Sami</option>
            <option value="PITE">Pite Sami</option>
            <option value="UME">Ume Sami</option>
            <option value="ENARE">Inari Sami</option>
            <option value="SKOLT">Skolt Sami</option>
            <option value="KILDIN">Kildin Sami</option>
            <option value="AKKALA">Akkala Sami</option>
            <option value="TER">Ter Sami</option>
          </select>
          {formErrors.contactLanguage && <div className="form-error">{formErrors.contactLanguage}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            placeholder="Enter your phone number"
          />
          {formErrors.phoneNumber && <div className="form-error">{formErrors.phoneNumber}</div>}
        </div>
        
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting}
        >
          {submitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <div className="auth-links">
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;