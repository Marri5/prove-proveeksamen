import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReindeerContext from '../../context/ReindeerContext';
import { formatDate } from '../../utils/helpers';

const ReindeerList = () => {
  const { reindeers, loading, error, fetchReindeers, deleteReindeer } = useContext(ReindeerContext);
  
  useEffect(() => {
    fetchReindeers();
  }, [fetchReindeers]);
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reindeer?')) {
      try {
        await deleteReindeer(id);
      } catch (err) {
        console.error('Error deleting reindeer:', err);
      }
    }
  };
  
  if (loading) return <div className="loading">Loading reindeers...</div>;
  
  if (error) return <div className="alert alert-danger">{error}</div>;
  
  if (reindeers.length === 0) {
    return (
      <div className="no-records-message">
        <p>You haven't registered any reindeers yet.</p>
        <Link to="/register-reindeer" className="btn btn-primary">
          Register Your First Reindeer
        </Link>
      </div>
    );
  }
  
  return (
    <div className="reindeer-list-container">
      <div className="list-header">
        <h3>Your Reindeers</h3>
        <Link to="/register-reindeer" className="btn btn-sm">
          + Add New
        </Link>
      </div>
      
      <div className="reindeers-grid">
        {reindeers.map(reindeer => (
          <div key={reindeer._id} className="reindeer-card">
            <h4>{reindeer.name}</h4>
            <div className="reindeer-details">
              <p><strong>Serial Number:</strong> {reindeer.serialNumber}</p>
              <p><strong>Birth Date:</strong> {formatDate(reindeer.birthDate)}</p>
              {reindeer.flokk && (
                <p><strong>Herd:</strong> {
                  typeof reindeer.flokk === 'object' 
                    ? reindeer.flokk.name 
                    : 'Unknown Herd'
                }</p>
              )}
            </div>
            <div className="card-actions">
              <Link to={`/reindeers/${reindeer._id}`} className="btn btn-sm">
                View
              </Link>
              <Link to={`/reindeers/edit/${reindeer._id}`} className="btn btn-sm btn-secondary">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(reindeer._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReindeerList;