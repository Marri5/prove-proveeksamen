import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const fetchResults = async () => {
      const query = new URLSearchParams(location.search).get('q');
      
      if (!query) {
        setError('No search query provided');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await api.get(`/api/v1/reindeers/search?query=${query}`);
        setResults(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching results');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchResults();
  }, [location.search]);
  
  if (loading) return <div className="loading">Loading results...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No results found. Try a different search term.</p>
      ) : (
        <>
          <p>{results.length} results found</p>
          <div className="results-grid">
            {results.map(reindeer => (
              <div key={reindeer._id} className="result-card">
                <h3>{reindeer.name}</h3>
                <div className="reindeer-details">
                  <p><strong>Serial Number:</strong> {reindeer.serialNumber}</p>
                  <p><strong>Birth Date:</strong> {new Date(reindeer.birthDate).toLocaleDateString()}</p>
                  {reindeer.herd && (
                    <>
                      <p><strong>Herd:</strong> {reindeer.herd.name}</p>
                      {reindeer.herd.owner && (
                        <p><strong>Owner:</strong> {reindeer.herd.owner.name}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;