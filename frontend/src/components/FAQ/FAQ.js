import React from 'react';

/**
 * FAQ Component for AI/LLM Optimization
 * Helps with GPT, Claude, Bard recommendations
 */
const FAQ = ({ faqs, calculatorName }) => {
  // Generate FAQ Schema for structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      
      <section className="faq-section" aria-label="Frequently Asked Questions">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FAQ;

