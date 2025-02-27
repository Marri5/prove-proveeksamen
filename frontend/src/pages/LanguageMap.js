import React from 'react';
import SamiMap from '../components/map/SamiMap';

const LanguageMap = () => {
  return (
    <div className="language-map-container">
      <h2>Sami Language Territories</h2>
      <div className="language-map-content">
        <div className="map-description">
          <p>
            The Sami people inhabit the northern parts of Norway, Sweden, Finland, and Russia's Kola Peninsula.
            Their traditional territories are divided into different language regions, each with its own distinct dialect.
          </p>
          <p>
            These regions serve as important identifiers for reindeer owners and their herds, as they typically
            graze their animals in their traditional territories.
          </p>
          <h3>Language Regions:</h3>
          <ul>
            <li><strong>Nord:</strong> Northern Norway and parts of Sweden</li>
            <li><strong>Sør:</strong> Southern Norway and adjacent Swedish areas</li>
            <li><strong>Lule:</strong> Around the Lule River valley in Sweden</li>
            <li><strong>Pite:</strong> Around the Pite River valley in Sweden</li>
            <li><strong>Ume:</strong> Around the Ume River valley in Sweden</li>
            <li><strong>Enare:</strong> Around Lake Inari in Finland</li>
            <li><strong>Skolt:</strong> Northeastern Finland and adjacent Russian areas</li>
            <li><strong>Kildin:</strong> Central Kola Peninsula in Russia</li>
            <li><strong>Akkala:</strong> Western Kola Peninsula in Russia</li>
            <li><strong>Ter:</strong> Eastern Kola Peninsula in Russia</li>
          </ul>
        </div>
        <div className="map-image-container">
          <SamiMap />
        </div>
      </div>
    </div>
  );
};

export default LanguageMap;