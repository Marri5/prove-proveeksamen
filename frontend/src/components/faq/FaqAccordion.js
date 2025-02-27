import React, { useState } from 'react';

const FaqAccordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            {item.question}
            <span className="accordion-icon">
              {activeIndex === index ? '−' : '+'}
            </span>
          </button>
          <div
            id={`accordion-content-${index}`}
            className={`accordion-content ${activeIndex === index ? 'open' : ''}`}
            aria-hidden={activeIndex !== index}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;