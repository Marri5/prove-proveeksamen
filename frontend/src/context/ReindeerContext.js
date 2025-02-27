// src/context/ReindeerContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import AuthContext from './AuthContext';

const ReindeerContext = createContext();

export const ReindeerProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [reindeers, setReindeers] = useState([]);
  const [herds, setHerds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchReindeers();
      fetchHerds();
    } else {
      setReindeers([]);
      setHerds([]);
      setLoading(false);
    }
  }, [isAuthenticated]);
  
  // Fetch all reindeers for the authenticated user
  const fetchReindeers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/v1/reindeers');
      setReindeers(res.data.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Error fetching reindeers');
      setLoading(false);
      console.error('Error fetching reindeers:', err);
    }
  };
  
  // Fetch all herds for the authenticated user
  const fetchHerds = async () => {
    try {
      const res = await api.get('/api/v1/herds');
      setHerds(res.data.data);
      setError(null);
    } catch (err) {
      setError('Error fetching herds');
      console.error('Error fetching herds:', err);
    }
  };
  
  // Add a new reindeer
  const addReindeer = async (reindeerData) => {
    try {
      setLoading(true);
      const res = await api.post('/api/v1/reindeers', reindeerData);
      setReindeers([...reindeers, res.data.data]);
      setLoading(false);
      setError(null);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding reindeer');
      setLoading(false);
      console.error('Error adding reindeer:', err.response?.data);
      throw err;
    }
  };
  
  // Update a reindeer
  const updateReindeer = async (id, reindeerData) => {
    try {
      setLoading(true);
      const res = await api.put(`/api/v1/reindeers/${id}`, reindeerData);
      setReindeers(
        reindeers.map(reindeer => 
          reindeer._id === id ? res.data.data : reindeer
        )
      );
      setLoading(false);
      setError(null);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating reindeer');
      setLoading(false);
      console.error('Error updating reindeer:', err.response?.data);
      throw err;
    }
  };
  
  // Delete a reindeer
  const deleteReindeer = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/api/v1/reindeers/${id}`);
      setReindeers(reindeers.filter(reindeer => reindeer._id !== id));
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error deleting reindeer');
      setLoading(false);
      console.error('Error deleting reindeer:', err.response?.data);
      throw err;
    }
  };
  
  // Add a new herd
  const addHerd = async (herdData) => {
    try {
      setLoading(true);
      const res = await api.post('/api/v1/herds', herdData);
      setHerds([...herds, res.data.data]);
      setLoading(false);
      setError(null);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding herd');
      setLoading(false);
      console.error('Error adding herd:', err.response?.data);
      throw err;
    }
  };
  
  // Get a single reindeer by ID
  const getReindeer = async (id) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/v1/reindeers/${id}`);
      setLoading(false);
      setError(null);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching reindeer');
      setLoading(false);
      console.error('Error fetching reindeer:', err.response?.data);
      throw err;
    }
  };
  
  // Search reindeers
  const searchReindeers = async (query) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/v1/reindeers/search?query=${query}`);
      setLoading(false);
      setError(null);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error searching reindeers');
      setLoading(false);
      console.error('Error searching reindeers:', err.response?.data);
      throw err;
    }
  };
  
  return (
    <ReindeerContext.Provider
      value={{
        reindeers,
        herds,
        loading,
        error,
        fetchReindeers,
        fetchHerds,
        addReindeer,
        updateReindeer,
        deleteReindeer,
        addHerd,
        getReindeer,
        searchReindeers,
        setError
      }}
    >
      {children}
    </ReindeerContext.Provider>
  );
};

export default ReindeerContext;