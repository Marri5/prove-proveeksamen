import React from 'react';
import SearchBar from '../components/search/SearchBar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Kukkik Ano Reindeer Registry</h1>
        <p>
          Welcome to the official registry for reindeer in Sami territories.
          Use the search below to find information about registered reindeers.
        </p>
        <SearchBar />
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>Register Your Reindeers</h3>
          <p>
            Are you a reindeer owner? Create an account to register and manage your reindeers.
          </p>
          <Link to="/register" className="btn btn-primary">
            Sign Up Now
          </Link>
        </div>

        <div className="feature-card">
          <h3>View Sami Territories</h3>
          <p>
            Explore the map of Sami language territories and grazing areas.
          </p>
          <Link to="/language-map" className="btn btn-secondary">
            View Map
          </Link>
        </div>

        <div className="feature-card">
          <h3>Learn About the Database</h3>
          <p>
            Understand the structure of our database and how information is organized.
          </p>
          <Link to="/database-info" className="btn btn-tertiary">
            Database Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;