import React from 'react';

const DatabaseInfo = () => {
  return (
    <div className="database-info-container">
      <h2>Database Structure</h2>
      
      <div className="database-info-content">
        <div className="er-diagram">
          <h3>Entity-Relationship Diagram</h3>
          <img
            src="/images/er_diagram.png"
            alt="Entity-Relationship Diagram of the Reindeer Registry Database"
            className="er-diagram-image"
          />
        </div>
        
        <div className="database-tables">
          <h3>Database Tables</h3>
          
          <div className="table-description">
            <h4>Owner</h4>
            <ul>
              <li><strong>Name:</strong> Owner's full name</li>
              <li><strong>UUID:</strong> Unique identifier</li>
              <li><strong>Email:</strong> Contact email</li>
              <li><strong>Password:</strong> Encrypted password</li>
              <li><strong>ContactLanguage:</strong> Preferred Sami language</li>
              <li><strong>PhoneNumber:</strong> Contact phone number</li>
            </ul>
          </div>
          
          <div className="table-description">
            <h4>Herd</h4>
            <ul>
              <li><strong>Owner:</strong> Reference to owner</li>
              <li><strong>Name:</strong> Herd name</li>
              <li><strong>SerialDivision:</strong> Serial numbering system</li>
              <li><strong>Buemerke (Name):</strong> Name of the earmark</li>
              <li><strong>Buemerke (Image):</strong> Image of the earmark</li>
            </ul>
          </div>
          
          <div className="table-description">
            <h4>Reindeer</h4>
            <ul>
              <li><strong>SerialNumber:</strong> Unique identifier</li>
              <li><strong>Name:</strong> Reindeer name</li>
              <li><strong>Herd:</strong> Reference to herd</li>
              <li><strong>BirthDate:</strong> Date of birth</li>
            </ul>
          </div>
          
          <div className="table-description">
            <h4>GrazingArea</h4>
            <ul>
              <li><strong>PrimaryArea:</strong> Language region</li>
              <li><strong>Counties:</strong> List of counties</li>
            </ul>
          </div>
        </div>
        
        <div className="project-link">
          <h3>Project Documentation</h3>
          <p>For more detailed information about the database structure and implementation, visit our project page:</p>
          <a
            href="https://github.com/Marri5/prove-proveeksamen"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default DatabaseInfo;