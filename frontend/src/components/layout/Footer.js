import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Kukkik Ano Reindeer Registry</p>
        <p>Preserving Sami heritage through proper reindeer registration</p>
      </div>
    </footer>
  );
};

export default Footer;