// Template for creating calculator pages efficiently
export const createCalculatorPage = (config) => {
  const {
    title,
    description,
    keywords,
    canonicalUrl,
    heading,
    subtitle,
    calculateFunction,
    formFields,
    infoContent
  } = config;

  return `
import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const ${config.componentName} = () => {
  ${config.stateDefinitions}

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${title}",
    "description": "${description}",
    "url": "https://yourdomain.com${canonicalUrl}"
  };

  ${calculateFunction}

  return (
    <>
      <SEO
        title="${title}"
        description="${description}"
        keywords="${keywords}"
        canonicalUrl="${canonicalUrl}"
        structuredData={structuredData}
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>${heading}</h1>
          <p>${subtitle}</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            ${formFields}
          </div>
        </div>

        <div className="info-section">
          ${infoContent}
        </div>
      </div>
    </>
  );
};

export default ${config.componentName};
`;
};

