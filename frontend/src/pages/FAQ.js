import React from 'react';
import FaqAccordion from '../components/faq/FaqAccordion';

const FAQ = () => {
  const faqItems = [
    {
      question: 'What is the Kukkik Ano Reindeer Registry?',
      answer: 'The Kukkik Ano Reindeer Registry is a comprehensive database system for recording and managing information about reindeers in Sami territories. It allows owners to register their reindeers and provides a search functionality for finding information about registered reindeers.'
    },
    {
      question: 'How do I register my reindeers?',
      answer: 'To register your reindeers, you first need to create an owner account. Once registered, you can log in to access the reindeer registration page where you can add your herds and individual reindeers.'
    },
    {
      question: 'What information is required to register a reindeer?',
      answer: 'To register a reindeer, you need to provide its serial number, name, herd information, and birth date. The reindeer will be automatically linked to your owner account.'
    },
    {
      question: 'Can I search for reindeers without an account?',
      answer: 'Yes, the search functionality is available to all visitors. You can search for reindeers by any information in the database, such as serial number, name, or herd.'
    },
    {
      question: 'What are the different Sami language regions?',
      answer: 'The Sami language regions include Nord, Sør, Lule, Pite, Ume, Enare, Skolt, Kildin, Akkala, and Ter. These regions span across Norway, Sweden, Finland, and Russia. You can view the complete map on the Language Map page.'
    }
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <FaqAccordion items={faqItems} />
    </div>
  );
};

export default FAQ;