import React from 'react';

const SamiMap = () => {
  return (
    <div className="sami-map">
      <img
        src="/public/images/sami_language_map.png"
        alt="Map of Sami language territories"
        className="map-image"
      />
      <div className="map-legend">
        <h4>Map Legend</h4>
        <ul>
          <li><span className="legend-color nord"></span> Nord</li>
          <li><span className="legend-color sor"></span> Sør</li>
          <li><span className="legend-color lule"></span> Lule</li>
          <li><span className="legend-color pite"></span> Pite</li>
          <li><span className="legend-color ume"></span> Ume</li>
          <li><span className="legend-color enare"></span> Enare</li>
          <li><span className="legend-color skolt"></span> Skolt</li>
          <li><span className="legend-color kildin"></span> Kildin</li>
          <li><span className="legend-color akkala"></span> Akkala</li>
          <li><span className="legend-color ter"></span> Ter</li>
        </ul>
      </div>
    </div>
  );
};

export default SamiMap;