// src/components/reindeer/ReindeerForm.js

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReindeerContext from '../../context/ReindeerContext';

const ReindeerForm = ({ reindeer = null, isEdit = false }) => {
  const { herds, addReindeer, updateReindeer, error, setError } = useContext(ReindeerContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    serialNumber: '',
    name: '',
    flokk: '',
    birthDate: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    // If editing, populate form with reindeer data
    if (isEdit && reindeer) {
      setFormData({
        serialNumber: reindeer.serialNumber || '',
        name: reindeer.name || '',
        flokk: reindeer.flokk?._id || reindeer.flokk || '',
        birthDate: reindeer.birthDate ? new Date(reindeer.birthDate).toISOString().split('T')[0] : ''
      });
    }
    
    // Clear any previous errors
    setError(null);
  }, [isEdit, reindeer, setError]);
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    
    try {
      if (isEdit && reindeer) {
        await updateReindeer(reindeer._id, formData);
      } else {
        await addReindeer(formData);
        // Reset form after successful submission
        setFormData({
          serialNumber: '',
          name: '',
          flokk: '',
          birthDate: ''
        });
      }
      
      setSuccess(true);
      
      // Redirect after editing or stay on page after adding
      if (isEdit) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="reindeer-form-container">
      <h2>{isEdit ? 'Edit Reindeer' : 'Register New Reindeer'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          {isEdit ? 'Reindeer updated successfully!' : 'Reindeer registered successfully!'}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="serialNumber">Serial Number</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={onChange}
            required
            disabled={isEdit} // Serial number shouldn't be edited after creation
          />
          {isEdit && (
            <p className="form-hint">Serial number cannot be changed after creation.</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Reindeer Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="flokk">Herd</label>
          <select
            id="flokk"
            name="flokk"
            value={formData.flokk}
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
            value={formData.birthDate}
            onChange={onChange}
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting || herds.length === 0}
        >
          {submitting ? 'Submitting...' : isEdit ? 'Update Reindeer' : 'Register Reindeer'}
        </button>
        
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/dashboard')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ReindeerForm;