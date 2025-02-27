import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const [herds, setHerds] = useState([]);
  const [reindeers, setReindeers] = useState([]);
  const [herdsLoading, setHerdsLoading] = useState(true);
  const [reindeersLoading, setReindeersLoading] = useState(true);
  const navigate = useNavigate();
  
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
    
    const fetchReindeers = async () => {
      try {
        const res = await api.get('/api/v1/reindeers');
        setReindeers(res.data.data);
        setReindeersLoading(false);
      } catch (err) {
        console.error('Error fetching reindeers', err);
        setReindeersLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchHerds();
      fetchReindeers();
    }
  }, [isAuthenticated, loading, navigate]);
  
  if (loading || herdsLoading || reindeersLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }
  
  return (
    <div className="dashboard-container">
      <h2>Owner Dashboard</h2>
      
      {user && (
        <div className="owner-info">
          <h3>Welcome, {user.name}</h3>
          <p>UUID: {user.uuid}</p>
          <p>Contact Language: {user.contactLanguage}</p>
        </div>
      )}
      
      <div className="dashboard-actions">
        <Link to="/register-reindeer" className="btn btn-primary">
          Register New Reindeer
        </Link>
        <Link to="/manage-herds" className="btn btn-secondary">
          Manage Herds
        </Link>
      </div>
      
      <div className="dashboard-content">
        <div className="herds-section">
          <h3>Your Herds</h3>
          
          {herds.length === 0 ? (
            <p>You haven't registered any herds yet.</p>
          ) : (
            <div className="herds-grid">
              {herds.map(herd => (
                <div key={herd._id} className="herd-card">
                  <h4>{herd.name}</h4>
                  <p><strong>Serial Division:</strong> {herd.serialDivision}</p>
                  <p><strong>Earmark:</strong> {herd.buemerke_name}</p>
                  <Link to={`/herds/${herd._id}`} className="btn btn-sm">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="reindeers-section">
          <h3>Your Reindeers</h3>
          
          {reindeers.length === 0 ? (
            <p>You haven't registered any reindeers yet.</p>
          ) : (
            <div className="reindeers-grid">
              {reindeers.map(reindeer => (
                <div key={reindeer._id} className="reindeer-card">
                  <h4>{reindeer.name}</h4>
                  <p><strong>Serial Number:</strong> {reindeer.serialNumber}</p>
                  <p><strong>Birth Date:</strong> {new Date(reindeer.birthDate).toLocaleDateString()}</p>
                  <Link to={`/reindeers/${reindeer._id}`} className="btn btn-sm">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;