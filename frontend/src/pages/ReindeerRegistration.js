import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';

const ReindeerRegistration = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [herds, setHerds] = useState([]);
  const [formData, setFormData] = useState({
    serialNumber: '',
    name: '',
    flokk: '',
    birthDate: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [herdsLoading, setHerdsLoading] = useState(true);
  
  const { serialNumber, name, flokk, birthDate } = formData;
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
    
    const fetchHerds = async () => {
      try {
        const res = await api.get('/api/v1/herds');
        setHerds(res.data.data);
        setHerdsLoading(false);
      } catch (err) {
        console.error('Error fetching herds', err);
        setHerdsLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchHerds();
    }
  }, [isAuthenticated, loading, navigate]);
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      await api.post('/api/v1/reindeers', formData);
      setSuccess(true);
      setFormData({
        serialNumber: '',
        name: '',
        flokk: '',
        birthDate: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register reindeer');
      console.error('Error registering reindeer', err.response?.data);
    }
  };
  
  if (loading || herdsLoading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="reindeer-registration-container">
      <h2>Register a New Reindeer</h2>
      
      {success && (
        <div className="alert alert-success">
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="serialNumber">Serial Number</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={serialNumber}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Reindeer Name</label>
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
          <label htmlFor="flokk">Herd</label>
          <select
            id="flokk"
            name="flokk"
            value={flokk}
            onChange={onChange}
            required
          >
            <option value="">Select a Herd</option>
            {herds.map(herd => (
              <option key={herd._id} value={herd._id}>
                {herd.name}
              </option>
            ))}
          </select>
          
          {herds.length === 0 && (
            <p className="form-hint">
              You need to create a herd first before registering reindeers.
            </p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={birthDate}
            onChange={onChange}
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={herds.length === 0}
        >
          Register Reindeer
        </button>
      </form>
      
      {herds.length === 0 && (
        <div className="no-herds-message">
          <p>You need to create a herd before you can register reindeers.</p>
          <button
            onClick={() => navigate('/manage-herds')}
            className="btn btn-secondary"
          >
            Create a Herd
          </button>
        </div>
      )}
    </div>
  );
};

export default ReindeerRegistration;