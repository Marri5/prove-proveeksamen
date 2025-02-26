"use client";
import { useState } from "react";

const faqs = [
  { question: "Hvordan registrerer jeg et reinsdyr?", answer: "Du må være logget inn for å registrere reinsdyr." },
  { question: "Hvordan fungerer søket?", answer: "Du kan søke på navn eller serienummer til reinsdyret." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Ofte stilte spørsmål</h1>
      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <button
              className="text-lg font-semibold w-full text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
            </button>
            {openIndex === index && <p className="mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
